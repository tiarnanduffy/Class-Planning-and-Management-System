
import { Request, Response } from "express";
import Module from "../models/module.model";
import Timetable from "../models/timetable.model";
import Course from "../models/course.model";
import scheduleRepository from "../repositories/schedule.repository";
import courseRepository from "../repositories/course.repository";
import timetableRepository from "../repositories/timetable.repository";
import pendingRepository from "../repositories/pending.repository";
import StudentTimetable from "../models/studenttimetable.model";

import User from "../models/user.model";
import userRepository from "../repositories/user.repository";
import Classtype from "../models/classtype.model";
import classtypeRepository from "../repositories/classtype.repository";
import Room from "../models/room.model";
import Constraints from "../models/constraints.model";

import scheduletablesRepository from "../repositories/scheduletables.repository";
import constraintsRepository from "../repositories/constraints.repository";
import moduleRepository from "../repositories/module.repository";


const RED = "\x1b[31m";
const GREEN = "\x1b[32m";

const LECTURE = "\x1b[38;2;254;243;199m";
const TUTORIAL = "\x1b[38;2;236;252;203m";
const PRACTICAL = "\x1b[38;2;251;207;232m";
const LAB = "\x1b[38;2;233;213;255m";
const ADVISORY = "\x1b[38;2;153;246;228m";
const DEFAULT = "\x1b[0m";
const DEFAULTwBG = "\x1b[0m" + "\x1b[48;5;250m";

const NUM_HOURS_PER_DAY = 8;

interface ISucceeded {
	schedule_id: number;
	module_id: number;
	user_id: number;
	room_id: number;
	classtype: string;
	slot: string;
}

interface IFailed {
	schedule_id: number;
	module_id: number;
	classtype: string;
	class_num: string;
}

interface ISuggestion {
	schedule_id: number;
	constraint_type: string;
	slots: string;
	requried_leeway: number;
}

interface IReason {
	schedule_id: number;
	reason: string;
	module_id: number;
	classtype: string;

}

const SLOTS_START_TO_END: string[] = ["m9", "m10", "m11", "m12", "m13", "m14", "m15", "m16",
	"t9", "t10", "t11", "t12", "t13", "t14", "t15", "t16",
	"w9", "w10", "w11", "w12", "w13", "w14", "w15", "w16",
	"th9", "th10", "th11", "th12", "th13", "th14", "th15", "th16",
	"f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16"];

const SLOTS_END_TO_START: string[] = [
	"f16", "f15", "f14", "f13", "f12", "f11", "f10", "f9",
	"th16", "th15", "th14", "th13", "th12", "th11", "th10", "th9",
	"w16", "w15", "w14", "w13", "w12", "w11", "w10", "w9",
	"t16", "t15", "t14", "t13", "t12", "t11", "t10", "t9",
	"m16", "m15", "m14", "m13", "m12", "m11", "m10", "m9"];

const SLOTS_DAY_BY_DAY: string[] = [
	"m9", "t9", "w9", "th9", "f9",
	"m10", "t10", "w10", "th10", "f10",
	"m11", "t11", "w11", "th11", "f11",
	"m12", "t12", "w12", "th12", "f12",
	"m13", "t13", "w13", "th13", "f13",
	"m14", "t14", "w14", "th14", "f14",
	"m15", "t15", "w15", "th15", "f15",
	"m16", "t16", "w16", "th16", "f16"];

function getSlots(traversalOrder: String) {

	switch (traversalOrder) {
		case "startToEnd":
			return SLOTS_START_TO_END;
		case "endToStart":
			return SLOTS_END_TO_START;
		case "dayByDay":
			return SLOTS_DAY_BY_DAY;
		case "random":
			// array of numbers between 0 and 40. every time one is used remove it from the array
			shuffleSlots(SLOTS_START_TO_END);
	}
	return SLOTS_START_TO_END;
}

function shuffleSlots(array: String[]) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] =
			[array[randomIndex], array[currentIndex]];
	}

	return array;
}

function shuffleModules(array: Module[]) {
	let currentIndex = array.length, randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex > 0) {

		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] =
			[array[randomIndex], array[currentIndex]];
	}

	return array;
}

// Handle Reasons
function handleFailedReason(reason: IReason, slotStr: String, failedReasons: IReason[]) {
	let conditionMet = false;

	// If reason is already in failedReasons append the slot to the reason
	for (let i = 0; i < failedReasons.length; i++) {
		if (failedReasons[i].reason.includes(reason.reason)) {
			failedReasons[i].reason += " | " + slotStr + " ";
			conditionMet = true;
			break;
		}
	}

	// If reason isnt already in failedReasons push and add a new line. Slots are displayed on the new line for frontend
	if (!conditionMet) {
		reason.reason += "\n"
		failedReasons.push(reason)
	}
}

// Handle Suggestions
function handleSuggestions(suggestion: ISuggestion, suggestions: ISuggestion[], suggestionString: string, suggestionStrings: string[], slotStr: String,) {

	let conditionMet = false;

	for (let i = 0; i < suggestionStrings.length; i++) {
		if (suggestionStrings[i].includes(suggestionString)) {
			conditionMet = true;
			break;
		}
	}

	for (let i = 0; i < suggestionStrings.length; i++) {
		if (suggestionStrings[i].includes(suggestionString)) {
			suggestions[i].slots += "|" + slotStr
			conditionMet = true;
			break;
		}
	}

	if (!conditionMet) {
		suggestionStrings.push(suggestionString + "\n" + DEFAULTwBG + "| " + slotStr + " ");
		suggestions.push(suggestion);
	}
}

// If lecturer available return true, else false
function lecturerAvail(lecturerDetails: User, lecturerTimetableDetails: Timetable, slotStr: string, col: String, schedule_id: number, failedReasons: IReason[], classtype: string, module_id: number) {
	if (lecturerTimetableDetails[slotStr] !== "available") {
		let recentFailure = "Lecturer Unavailable.\n" + "(Lecturer " + lecturerDetails.user_id + ") " + lecturerDetails.firstname + " " + lecturerDetails.lastname + " OCCUPIED";

		let reason: IReason = {
			schedule_id: schedule_id,
			reason: recentFailure,
			module_id: module_id,
			classtype: classtype
		}

		handleFailedReason(reason, slotStr, failedReasons);
		return false;
	}
	return true;
}

// Get room
async function roomAvailIndex(roomList: Room[], slotStr: string, col: String, classFacility: String, classtype: string, failedReasons: IReason[], schedule_id: number, module_id: number) {
	let foundRoomIndex = -1;

	// The percentage of students that need to fit in the room
	for (let r = 0; r < roomList.length; r++) {
		const roomTimetableDetails: Timetable = await timetableRepository.retrieveByTimetableId(roomList[r].timetable_id);

		if (roomTimetableDetails[slotStr] !== "available") {
			// Room not available so continue
			let recentFailure = "Room unavailable.\n Room " + roomList[r].room_name + " OCCUPIED";

			let reason: IReason = {
				schedule_id: schedule_id,
				reason: recentFailure,
				module_id: module_id,
				classtype: classtype
			}

			handleFailedReason(reason, slotStr, failedReasons);
			continue;
		}

		if (roomList[r].facility !== classFacility) {
			// Room available but facility doesnt match, continue
			let recentFailure = "Room facility does not match.\n" + " Room " + roomList[r].room_name + " has facility: '" + roomList[r].facility + "' - " + classtype + " requires facility: '" + classFacility + "'";
			let reason: IReason = {
				schedule_id: schedule_id,
				reason: recentFailure,
				module_id: module_id,
				classtype: classtype
			}
			handleFailedReason(reason, slotStr, failedReasons);
			continue;
		}

		// foundRoomIndex is the index of the roomList
		foundRoomIndex = r;
		break;
	}

	// Return room index of roomList
	return foundRoomIndex;
}

// Check facility-matching rooms, if one is available add to suggestions with required leeway
async function facRoomAvailIndexSuggestion(roomList: Room[], slotStr: string, col: String, classType: String, suggestions: ISuggestion[], suggestionStrings: string[], enrolled_students: number, module_name: String, facRoomAvail: boolean, count: number, prefix: String, schedule_id: number) {
	let suggestionString: string = "";

	for (let r = 0; r < roomList.length; r++) {
		const roomTimetableDetails: Timetable = await timetableRepository.retrieveByTimetableId(roomList[r].timetable_id);

		if (roomTimetableDetails[slotStr] === "available") {
			const requiredLeeway: number = Math.floor((roomList[r].capacity / enrolled_students) * 100) - 1;
			suggestionString = RED + "SUGGESTION - ROOM CAPACITY: " + col + module_name + " " + classType + " " + (count + 1) + ". Room " + roomList[r].room_name + GREEN + " REQUIRES " + requiredLeeway + "% LEEWAY" + col;

			let constraint = prefix + "_room_leeway";

			let suggestion: ISuggestion = {
				schedule_id: schedule_id,
				constraint_type: constraint,
				slots: slotStr,
				requried_leeway: requiredLeeway
			}

			handleSuggestions(suggestion, suggestions, suggestionString, suggestionStrings, slotStr);
			facRoomAvail = true;
		}
	}
}

// Get number of unavailable students
function studentUnavailCount(studentTimetableList: Timetable[], slotStr: string) {
	let unavailableStudentCount = 0;

	for (let s = 0; s < studentTimetableList.length; s++) {
		if (studentTimetableList[s][slotStr] !== "available") {
			unavailableStudentCount++;
		}
	}

	return unavailableStudentCount;
}


async function scheduleClass(courseDetails: Course, constraints: Constraints,
	moduleDetails: Module, lecturerDetails: User, lecturerTimetableDetails: Timetable, roomList: Room[], studentTimetableList: Timetable[],
	succeededClasses: ISucceeded[], pendingList: String[], failedClasses: IFailed[],
	classType: string, count: number, classFacility: string,
	failedReasons: IReason[], suggestions: ISuggestion[], suggestionStrings: string[], schedule_id: number, class_num: string) {

	let prefix: string = "";
	let col: string = "";
	let capLeeway: number = 100;
	let stuLeeway: number = 100;
	let enrolledStudents = moduleDetails.enrolled_students;
	let building_id = courseDetails.building_id;
	let moduleName = moduleDetails.module_name;
	let module_id = moduleDetails.module_id;
	let numClasses = count;

	let classesPerDay: number = 0;
	let lecClassesPerDay: number;
	let tutClassesPerDay: number;
	let praClassesPerDay: number;
	let labClassesPerDay: number;
	let advClassesPerDay: number;

	if (count == 0) {
		return false;
	}

	lecClassesPerDay = parseInt(constraints.lecClassesPerDay);
	tutClassesPerDay = parseInt(constraints.tutClassesPerDay);
	praClassesPerDay = parseInt(constraints.praClassesPerDay);
	labClassesPerDay = parseInt(constraints.labClassesPerDay);
	advClassesPerDay = parseInt(constraints.advClassesPerDay);

	switch (classType) {
		case "Lecture":
			capLeeway = parseInt(constraints.lecRoomLeeway);
			stuLeeway = parseInt(constraints.lecStuLeeway);
			classesPerDay = lecClassesPerDay;
			prefix = "lec";
			col = LECTURE + "\x1b[48;5;250m";
			break;
		case "Tutorial":
			capLeeway = parseInt(constraints.tutRoomLeeway);
			stuLeeway = parseInt(constraints.tutStuLeeway);
			classesPerDay = tutClassesPerDay;
			prefix = "tut";
			col = TUTORIAL + "\x1b[48;5;250m";
			break;
		case "Practical":
			capLeeway = parseInt(constraints.praRoomLeeway);
			stuLeeway = parseInt(constraints.praStuLeeway);
			classesPerDay = praClassesPerDay;
			prefix = "pra";
			col = PRACTICAL + "\x1b[48;5;250m";
			break;
		case "Lab":
			capLeeway = parseInt(constraints.labRoomLeeway);
			stuLeeway = parseInt(constraints.labStuLeeway);
			classesPerDay = labClassesPerDay;
			prefix = "lab";
			col = LAB + "\x1b[48;5;250m";
			break;
		case "Advisory":
			capLeeway = parseInt(constraints.advRoomLeeway);
			stuLeeway = parseInt(constraints.advStuLeeway);
			classesPerDay = advClassesPerDay;
			prefix = "adv";
			col = ADVISORY + "\x1b[48;5;250m";
			break;
	}

	let scheduleFailed = false;

	let foundSlot: boolean = false;

	let isLecturerSlot: boolean = false;
	let isRoomSlot: boolean = false;
	let hasFacility: boolean = false;
	let hasStudents: boolean = false;
	let validTraversalConstraint = true;

	let secondPass = false;
	let classesScheduledToday = 0;
	let skipToNextDay = false;
	let skipCount = 0;

	if (constraints.traversalOrder === 'random' || constraints.traversalOrder === 'dayByDay') {
		validTraversalConstraint = false;
	}

	const slots: string[] = getSlots(constraints.traversalOrder);

	for (let tts = 0; tts < slots.length; tts++) {
		if (count == 0) {
			// There are no classes left to schedule for this class type. Break
			break;
		}

		// validTraversalConstraint means that there is a set number of classes per day
		if (validTraversalConstraint) {
			let currentHourIndex = tts % NUM_HOURS_PER_DAY;

			/*
			----------------------------------------------------------------------------------------------------------------
			If we have got to line 543 A class has been scheduled
			line 509:		
			classesScheduledToday++;
			----------------------------------------------------------------------------------------------------------------
			We have reached the number of classes we want to schedule so go to next day
			line 510:	
			if (classesScheduledToday === classesPerDay) {
				skipToNextDay = true;
			}
			...
			----------------------------------------------------------------------------------------------------------------
			*/
			if (skipToNextDay === true) {
				/* 
				...
				therefore, we want to skip to the next day 
				skipCount = the amount of hours left in the day
				*/
				skipCount = NUM_HOURS_PER_DAY - currentHourIndex;
				skipToNextDay = false;
			}
			if (skipCount > 0) {
				/*
				more hours left in the day, we don't need to process those slots, we can do this by continuing
				HOWEVER if it is the last slot of the day we break out of the main loop
				ELSE start the loop over again
				*/
				skipCount--;
				if (tts === 39 && count > 0) {
					if (secondPass) {
						// we are already on the second pass so we set tts to 39 which will break out of our main slots loop
						tts = 39;
					} else {
						// else we are just starting our second pass, set secondPass to true, and go back to the beginning of the loop
						secondPass = true;
						tts = 0;
					}
				}
				continue;
			}

			// at start of new day, so classesScheduleToday = 0
			if (currentHourIndex == 0) {
				classesScheduledToday = 0;
			}

			foundSlot = false;
		}


		if (!lecturerAvail(lecturerDetails, lecturerTimetableDetails, slots[tts], col, schedule_id, failedReasons, classType, module_id)) {
			// couldn't schedule lecturer, continue to next slot
			continue;
		}
		isLecturerSlot = true;

		let foundRoomIndex = await roomAvailIndex(roomList, slots[tts], col, classFacility, classType, failedReasons, schedule_id, module_id);

		
		if (foundRoomIndex === -1) {
			// didn't find room, continue to next slot
			continue;
		}

		// can schedule lecturer and room
		let stuThreshold = enrolledStudents * (stuLeeway / 100);
		let unavailMax = enrolledStudents - stuThreshold;
		let unavailableStudentCount = studentUnavailCount(studentTimetableList, slots[tts]);

		if (unavailableStudentCount > unavailMax) {
			continue;
		}

		// can schedule lecturer, room and students
		hasStudents = true;

		// key is used so that frontend can colour code class types through a split, not great code practice but yano
		let moduleWithClassKey = moduleDetails.module_name + "§" + prefix;
		foundSlot = true;

		lecturerTimetableDetails[slots[tts]] = moduleDetails.module_name;

		// Update timetable slots for entities and add the timetable_id|slot pair to pendingList, so that they can then be used to split and be reset to "available" if schedule fails or on re-schedule attempt
		
		await timetableRepository.updateTimetableSlot(lecturerDetails.timetable_id, slots[tts], moduleWithClassKey);
		pendingList.push(lecturerDetails.timetable_id.toString() + "§" + slots[tts]);

		await timetableRepository.updateTimetableSlot(roomList[foundRoomIndex].timetable_id, slots[tts], moduleWithClassKey);
		pendingList.push(roomList[foundRoomIndex].timetable_id.toString() + "§" + slots[tts]);

		await timetableRepository.updateTimetableSlot(moduleDetails.timetable_id, slots[tts], moduleWithClassKey);
		pendingList.push(moduleDetails.timetable_id.toString() + "§" + slots[tts]);

		for (let s = 0; s < studentTimetableList.length; s++) {
			await timetableRepository.updateTimetableSlot(studentTimetableList[s].timetable_id, slots[tts], moduleWithClassKey);
			pendingList.push(studentTimetableList[s].timetable_id.toString() + "§" + slots[tts]);
		}

		let succeededClass: ISucceeded = {
			schedule_id: schedule_id,
			module_id: moduleDetails.module_id,
			user_id: lecturerDetails.user_id,
			room_id: roomList[foundRoomIndex].room_id,
			classtype: classType,
			slot: slots[tts]
		}

		succeededClasses.push(succeededClass);

		isRoomSlot = true;
		foundRoomIndex = -1;

		classesScheduledToday++;
		if (classesScheduledToday === classesPerDay) {
			skipToNextDay = true;
		}

		count--;

		continue;
	}

	if (foundSlot === false) {
		// we have been through the slots twice and we still can't schedule a slot

		// Add failedReasons array to database
		for (let i = 0; i < failedReasons.length; i++) {
			await scheduletablesRepository.addReason(schedule_id, failedReasons[i].reason, module_id, classType)
		}

		let facRoomAvail = false;


		if (isRoomSlot === false) {
			roomList = await scheduleRepository.retrieveRoomsByFacilityMatch(classFacility, building_id);
			for (let tts = 0; tts < slots.length; tts++) {
				await facRoomAvailIndexSuggestion(roomList, slots[tts], col, classType, suggestions, suggestionStrings, enrolledStudents, moduleName, facRoomAvail, count, prefix, schedule_id);
			}
		}

		if (hasStudents === false && facRoomAvail === false) {
			let stuThreshold = enrolledStudents * (stuLeeway / 100);
			let unavailMax = enrolledStudents - stuThreshold;

			for (let tts = 0; tts < slots.length; tts++) {
				let unavailableStudentCount = studentUnavailCount(studentTimetableList, slots[tts]);
				const requiredLeeway: number = Math.floor(100 - ((unavailableStudentCount / enrolledStudents) * 100));
				if (unavailableStudentCount > unavailMax) {

					let recentFailure = "Students Unavailable.\n" + unavailableStudentCount + " STUDENT(S) UNAVAILABLE out of "
						+ enrolledStudents + " enrolled students. (" + stuLeeway + "% current leeway)";

					let reason: IReason = {
						schedule_id: schedule_id,
						reason: recentFailure,
						module_id: module_id,
						classtype: classType
					}

					handleFailedReason(reason, slots[tts], failedReasons);

					let suggestionString = RED + "SUGGESTION - STUDENT AVAILABILITY: " + col + moduleDetails.module_name + " " + classType + " "
						+ (count + 1) + "." + GREEN + " REQUIRES " + requiredLeeway + "% LEEWAY. " + DEFAULTwBG + "(CURRENT: " + stuLeeway + "%)" + col;

					let constraint = prefix + "_stu_leeway";

					let suggestion: ISuggestion = {
						schedule_id: schedule_id,
						constraint_type: constraint,
						slots: slots[tts],
						requried_leeway: requiredLeeway
					}

					handleSuggestions(suggestion, suggestions, suggestionString, suggestionStrings, slots[tts]);

				}
			}
		}
		let reasonLecturer: string = "";
		let facilityReason: string = "";
		let studentsReason: string = "";

		// ScheduleFailed = true. We know the schedule has failed at some point. This variable won't be set to true again
		scheduleFailed = true;

		if (!isLecturerSlot) { reasonLecturer = "Lecturer unavailable. "; }
		if (!hasFacility) { facilityReason = "No facility was available. "; }
		if (!hasStudents && isRoomSlot && isLecturerSlot && hasFacility) { studentsReason = "Student(s) not available. "; }

		let failedClassNum = numClasses - count;

		if( parseInt(class_num) != -1  ){
			failedClassNum = parseInt(class_num);
		}

		for (let i = 0; i < count; i++) {
			let failedClass: IFailed = {
				schedule_id: schedule_id,
				module_id: moduleDetails.module_id,
				classtype: classType,
				class_num: (failedClassNum++).toString(),
			}
			
			failedClasses.push(failedClass);
		}
	}
	return scheduleFailed;

}

export default class ScheduleController {

	// Main Class - calls main function scheduleClass()
	async doSchedule(req: Request, res: Response) {

		const course_id: number = parseInt(req.params.course_id);

		await scheduletablesRepository.addScheduleRow(course_id);
		const schedule_id: number = await scheduletablesRepository.getMostRecentScheduleId();
		await scheduletablesRepository.updateScheduleRow("pending", schedule_id);

		const courseDetails: Course = await courseRepository.retrieveById(course_id);

		let constraints: Constraints;
		try {
			constraints = req.body;
		} catch (error) {
			console.error("Error parsing constraints JSON:", error);
			return res.status(400).send("Invalid constraints format");
		}

		// Gets module order type. This will have more than one index if its 'byPriority'
		const moduleOrderType: string = constraints.moduleOrder[0];

		await constraintsRepository.addConstraints(schedule_id, constraints.traversalOrder, moduleOrderType,
			constraints.lecRoomLeeway, constraints.tutRoomLeeway, constraints.praRoomLeeway, constraints.labRoomLeeway, constraints.advRoomLeeway,
			constraints.lecStuLeeway, constraints.tutStuLeeway, constraints.praStuLeeway, constraints.labStuLeeway, constraints.advStuLeeway,
			constraints.lecClassesPerDay, constraints.tutClassesPerDay, constraints.praClassesPerDay, constraints.labClassesPerDay, constraints.advClassesPerDay,
			constraints.useSubLecturer);

		const constraints_id = await constraintsRepository.getMostRecentConstraintsId();

		
		// Has to be '==' rather than '===' because courseDetails.scheduled interpreted as '1'
		if (courseDetails.scheduled == true) {
			let pendingString: string = await pendingRepository.retrievePendingString(courseDetails.pending_id);
			let pendingArray: string[] = pendingString.split("|");
			// sets all slots pendingString back to "available"
			for (let p = 0; p < pendingArray.length; p++) {
				let pendingSplits = pendingArray[p].split("§");
				let tt_id: number = Number(pendingSplits[0]);
				let slot = pendingSplits[1];
				await timetableRepository.updateTimetableSlot(tt_id, slot, "available");
			}
			await pendingRepository.addPending(null, courseDetails.pending_id);
		}
		// Initialise schedule to false
		await courseRepository.setScheduled(false, course_id);

		// retrieve modules from course
		let moduleList: Module[] = await scheduleRepository.retrieveModulesOrderedByStudentsEnrolled(course_id);

		const moduleOrderConstraintKey = constraints.moduleOrder;
		const moduleOrderConstraint = moduleOrderConstraintKey[0];

		// modify moduleList based on moduleOrderConstraint byPriority i.e. custom list
		if (moduleOrderConstraint === "byPriority") {
			const reorderedModules: Module[] = [];

			for (let i = 1; i <= moduleOrderConstraintKey.length; i++) {
				const moduleId = parseInt(moduleOrderConstraintKey[i]);
				const module = moduleList.find(module => module.module_id === moduleId);
				if (module) {
					reorderedModules.push(module);
					// push to moduleorder table
					await constraintsRepository.addModuleOrder(constraints_id, module.module_id);
				}
			}
			moduleList = reorderedModules;
		} else if (moduleOrderConstraint === "random") {
			moduleList = shuffleModules(moduleList);
		}

		const classOrderConstraintKey = constraints.classOrder;
		for (let i = 0; i < classOrderConstraintKey.length; i++) {
			await constraintsRepository.addClassOrder(constraints_id, classOrderConstraintKey[i]);
		}

		// Initialise outcome-required arrays
		let pendingList: String[] = [];
		let scheduleFailed: boolean = false;
		let succeededClasses: ISucceeded[] = [];
		let failedClasses: IFailed[] = [];
		let suggestions: ISuggestion[] = [];
		let suggestionStrings: string[] = [];

		for (let m = 0; m < moduleList.length; m++) {
		
			let moduleDetails = moduleList[m];

			let classtypeDetails: Classtype = await classtypeRepository.retrieveByModuleId(moduleDetails.module_id);

			// Get number of classes for module
			let lectureCount: number = classtypeDetails.num_lectures;
			let tutorialCount: number = classtypeDetails.num_tutorials;
			let practicalCount: number = classtypeDetails.num_practicals;
			let labCount: number = classtypeDetails.num_labs;
			let advisoryCount: number = classtypeDetails.num_advisories;

			// Get lecturer, lecturer's timetable, and array of students' timetables
			const lecturerDetails: User = await userRepository.retrieveByUserId(moduleDetails.user_id);
			const lecturerTimetableDetails: Timetable = await timetableRepository.retrieveByTimetableId(lecturerDetails.timetable_id);
			const studentTimetableList: StudentTimetable[] = await scheduleRepository.retrieveRegisteredStudentTimetables(moduleDetails.module_id);

			let lectureFailedReasons: IReason[] = [];
			let tutorialFailedReasons: IReason[] = [];
			let practicalFailedReasons: IReason[] = [];
			let labFailedReasons: IReason[] = [];
			let advisoryFailedReasons: IReason[] = [];

			let enrolledStudents = moduleDetails.enrolled_students;

			let lecLeeway = parseInt(constraints.lecRoomLeeway);
			let tutLeeway = parseInt(constraints.tutRoomLeeway);
			let praLeeway = parseInt(constraints.praRoomLeeway);
			let labLeeway = parseInt(constraints.labRoomLeeway);
			let advLeeway = parseInt(constraints.advRoomLeeway);

			let lecCapThreshold = enrolledStudents * (lecLeeway / 100);
			let tutCapThreshold = enrolledStudents * (tutLeeway / 100);
			let praCapThreshold = enrolledStudents * (praLeeway / 100);
			let labCapThreshold = enrolledStudents * (labLeeway / 100);
			let advCapThreshold = enrolledStudents * (advLeeway / 100);

			let lecRoomList = await scheduleRepository.retrieveRoomsByCapacity(lecCapThreshold, courseDetails.building_id);
			let tutRoomList = await scheduleRepository.retrieveRoomsByCapacity(tutCapThreshold, courseDetails.building_id);
			let praRoomList = await scheduleRepository.retrieveRoomsByCapacity(praCapThreshold, courseDetails.building_id);
			let labRoomList = await scheduleRepository.retrieveRoomsByCapacity(labCapThreshold, courseDetails.building_id);
			let advRoomList = await scheduleRepository.retrieveRoomsByCapacity(advCapThreshold, courseDetails.building_id);

			let thisSchedFailed = false;

			for (let i = 0; i < 5; i++) {

				switch (classOrderConstraintKey[i]) {
					case "lec":
						thisSchedFailed = await scheduleClass(courseDetails, constraints, moduleDetails, lecturerDetails, lecturerTimetableDetails, lecRoomList, studentTimetableList,
							succeededClasses, pendingList, failedClasses,
							"Lecture", lectureCount, classtypeDetails.lecture_facility, lectureFailedReasons, suggestions, suggestionStrings, schedule_id, "-1");
						if (thisSchedFailed) scheduleFailed = thisSchedFailed;
						break;
					case "tut":
						thisSchedFailed = await scheduleClass(courseDetails, constraints, moduleDetails, lecturerDetails, lecturerTimetableDetails, tutRoomList, studentTimetableList,
							succeededClasses, pendingList, failedClasses,
							"Tutorial", tutorialCount, classtypeDetails.tutorial_facility, tutorialFailedReasons, suggestions, suggestionStrings, schedule_id, "-1");
						if (thisSchedFailed) scheduleFailed = thisSchedFailed;
						break;
					case "pra":
						thisSchedFailed = await scheduleClass(courseDetails, constraints, moduleDetails, lecturerDetails, lecturerTimetableDetails, praRoomList, studentTimetableList,
							succeededClasses, pendingList, failedClasses,
							"Practical", practicalCount, classtypeDetails.practical_facility, practicalFailedReasons, suggestions, suggestionStrings, schedule_id, "-1");
						if (thisSchedFailed) scheduleFailed = thisSchedFailed;
						break;
					case "lab":
						thisSchedFailed = await scheduleClass(courseDetails, constraints, moduleDetails, lecturerDetails, lecturerTimetableDetails, labRoomList, studentTimetableList,
							succeededClasses, pendingList, failedClasses,
							"Lab", labCount, classtypeDetails.lab_facility, labFailedReasons, suggestions, suggestionStrings, schedule_id, "-1");
						if (thisSchedFailed) scheduleFailed = thisSchedFailed;
						break;
					case "adv":
						thisSchedFailed = await scheduleClass(courseDetails, constraints, moduleDetails, lecturerDetails, lecturerTimetableDetails, advRoomList, studentTimetableList,
							succeededClasses, pendingList, failedClasses,
							"Advisory", advisoryCount, classtypeDetails.advisory_facility, advisoryFailedReasons, suggestions, suggestionStrings, schedule_id, "-1");
						if (thisSchedFailed) scheduleFailed = thisSchedFailed;
						break;
				}
			}
		}


		let pendingString: string = pendingList.join("|");
		await pendingRepository.addPending(pendingString, courseDetails.pending_id);
		await courseRepository.setScheduled(true, course_id);
		await scheduletablesRepository.updateScheduleRow("scheduled", schedule_id);

		for (let s = 0; s < succeededClasses.length; s++) {
			await scheduletablesRepository.addSucceeded(schedule_id, succeededClasses[s].module_id, succeededClasses[s].user_id, succeededClasses[s].room_id, succeededClasses[s].classtype, succeededClasses[s].slot);
		}

		if (scheduleFailed) {
			
			// Unable to schedule a module. Adding failed and suggested to database

			for (let f = 0; f < failedClasses.length; f++) {
				await scheduletablesRepository.addFailed(schedule_id, failedClasses[f].module_id, failedClasses[f].classtype, failedClasses[f].class_num)
			}

			for (let u = 0; u < suggestions.length; u++) {
				await scheduletablesRepository.addSuggestion(schedule_id, suggestions[u].constraint_type, suggestions[u].slots, suggestions[u].requried_leeway);
			}

			// If the substitute lecturer constraint is on, do the scheduleClass function again with the sub lecturers details instead
			if (constraints.useSubLecturer == true) {

				let rerunSucceededClasses: ISucceeded[] = [];
				let rerunFailedClasses: IFailed[] = [];
				let rerunSuggestions: ISuggestion[] = [];
				let rerunSuggestionStrings: string[] = [];

				let lecLeeway = parseInt(constraints.lecRoomLeeway);
				let tutLeeway = parseInt(constraints.tutRoomLeeway);
				let praLeeway = parseInt(constraints.praRoomLeeway);
				let labLeeway = parseInt(constraints.labRoomLeeway);
				let advLeeway = parseInt(constraints.advRoomLeeway);

				let lectureFailedReasons: IReason[] = [];
				let tutorialFailedReasons: IReason[] = [];
				let practicalFailedReasons: IReason[] = [];
				let labFailedReasons: IReason[] = [];
				let advisoryFailedReasons: IReason[] = [];

				let rerunScheduleFailed = false;
				let rerunFailed = false;


				// Rather than looping through modules' classes through class numbers we just loop through failedClasses
				for (let f = 0; f < failedClasses.length; f++) {
					let module_id = failedClasses[f].module_id;
					let classtype = failedClasses[f].classtype;
					let class_num = failedClasses[f].class_num;
					let moduleDetails = await moduleRepository.retrieveById(module_id);
					let lecturerDetails = await userRepository.retrieveByUserId(moduleDetails.sub_lecturer_id)
					let lecturerTimetableDetails: Timetable = await timetableRepository.retrieveByTimetableId(lecturerDetails.timetable_id);
					let enrolled_students = moduleDetails.enrolled_students;
					let classtypeDetails = await classtypeRepository.retrieveByModuleId(module_id);
					const studentTimetableList: StudentTimetable[] = await scheduleRepository.retrieveRegisteredStudentTimetables(moduleDetails.module_id);

					switch (classtype) {
						case "Lecture":
							let lecCapThreshold = enrolled_students * (lecLeeway / 100);
							let lecRoomList = await scheduleRepository.retrieveRoomsByCapacity(lecCapThreshold, courseDetails.building_id);
							rerunFailed = await scheduleClass(courseDetails, constraints,
								moduleDetails, lecturerDetails, lecturerTimetableDetails, lecRoomList, studentTimetableList,
								rerunSucceededClasses, pendingList, rerunFailedClasses,
								"Lecture", 1, classtypeDetails.lecture_facility, lectureFailedReasons, rerunSuggestions, rerunSuggestionStrings, schedule_id, class_num);
							if (rerunFailed) rerunScheduleFailed = rerunFailed;
							break;
						case "Tutorial":
							let tutCapThreshold = enrolled_students * (tutLeeway / 100);
							let tutRoomList = await scheduleRepository.retrieveRoomsByCapacity(tutCapThreshold, courseDetails.building_id);
							rerunFailed = await scheduleClass(courseDetails, constraints, moduleDetails, lecturerDetails, lecturerTimetableDetails, tutRoomList, studentTimetableList,
								rerunSucceededClasses, pendingList, rerunFailedClasses,
								"Tutorial", 1, classtypeDetails.tutorial_facility, tutorialFailedReasons, rerunSuggestions, rerunSuggestionStrings, schedule_id, class_num);
							if (rerunFailed) rerunScheduleFailed = rerunFailed;
							break;
						case "Practical":
							let praCapThreshold = enrolled_students * (praLeeway / 100);
							let praRoomList = await scheduleRepository.retrieveRoomsByCapacity(praCapThreshold, courseDetails.building_id);
							rerunFailed = await scheduleClass(courseDetails, constraints, moduleDetails, lecturerDetails, lecturerTimetableDetails, praRoomList, studentTimetableList,
								rerunSucceededClasses, pendingList, rerunFailedClasses,
								"Practical", 1, classtypeDetails.practical_facility, practicalFailedReasons, rerunSuggestions, rerunSuggestionStrings, schedule_id, class_num);
							if (rerunFailed) rerunScheduleFailed = rerunFailed;
							break;
						case "Lab":
							let labCapThreshold = enrolled_students * (labLeeway / 100);

							let labRoomList = await scheduleRepository.retrieveRoomsByCapacity(labCapThreshold, courseDetails.building_id);
							rerunFailed = await scheduleClass(courseDetails, constraints, moduleDetails, lecturerDetails, lecturerTimetableDetails, labRoomList, studentTimetableList,
								rerunSucceededClasses, pendingList, rerunFailedClasses,
								"Lab", 1, classtypeDetails.lab_facility, labFailedReasons, rerunSuggestions, rerunSuggestionStrings, schedule_id, class_num);
							if (rerunFailed) rerunScheduleFailed = rerunFailed;
							break;
						case "Advisory":
							let advCapThreshold = enrolled_students * (advLeeway / 100);
							let advRoomList = await scheduleRepository.retrieveRoomsByCapacity(advCapThreshold, courseDetails.building_id);
							rerunFailed = await scheduleClass(courseDetails, constraints, moduleDetails, lecturerDetails, lecturerTimetableDetails, advRoomList, studentTimetableList,
								rerunSucceededClasses, pendingList, rerunFailedClasses,
								"Advisory", 1, classtypeDetails.advisory_facility, advisoryFailedReasons, rerunSuggestions, rerunSuggestionStrings, schedule_id, class_num);
							if (rerunFailed) rerunScheduleFailed = rerunFailed;
							break;
					}
				}
				if (rerunScheduleFailed) {
					// Rerun failed, set pending tt|slot back to "available"
					for (let p = 0; p < pendingList.length; p++) {
						let pendingSplits = pendingList[p].split("§");
						let tt_id: number = Number(pendingSplits[0]);
						let slot = pendingSplits[1];

						await timetableRepository.updateTimetableSlot(tt_id, slot, "available");
					}

					await scheduletablesRepository.updateScheduleRow("failed", schedule_id);

					// Add succeeded, failed, and suggested to database so timetables-outcome can get them
					for (let s = 0; s < rerunSucceededClasses.length; s++) {
						await scheduletablesRepository.addSucceeded(schedule_id, rerunSucceededClasses[s].module_id, rerunSucceededClasses[s].user_id, rerunSucceededClasses[s].room_id, rerunSucceededClasses[s].classtype, rerunSucceededClasses[s].slot);
					}
					for (let f = 0; f < rerunFailedClasses.length; f++) {
						await scheduletablesRepository.addFailed(schedule_id, rerunFailedClasses[f].module_id, rerunFailedClasses[f].classtype, failedClasses[f].class_num)
					}
					for (let u = 0; u < rerunSuggestions.length; u++) {
						await scheduletablesRepository.addSuggestion(schedule_id, rerunSuggestions[u].constraint_type, rerunSuggestions[u].slots, rerunSuggestions[u].requried_leeway);
					}

					await pendingRepository.addPending(null, courseDetails.pending_id);
					await courseRepository.setScheduled(false, course_id);
				} else {
					// Schedule has succeeded on rerun
					// add all tt_id|slot pairs to pending table so they can be reset in a reschedule
					let pendingString: string = pendingList.join("|");
					await pendingRepository.addPending(pendingString, courseDetails.pending_id);
					await courseRepository.setScheduled(true, course_id);
					await scheduletablesRepository.updateScheduleRow("scheduled", schedule_id);

					for (let s = 0; s < rerunSucceededClasses.length; s++) {
						await scheduletablesRepository.addSucceeded(schedule_id, rerunSucceededClasses[s].module_id, rerunSucceededClasses[s].user_id, rerunSucceededClasses[s].room_id, rerunSucceededClasses[s].classtype, rerunSucceededClasses[s].slot);
					}
					// delete all failedClasses from failed table
					await scheduletablesRepository.deleteRows(schedule_id);
				}
			} else {
				// useSubstitueLecturer is false and schedule has failed
				// reset all tt_id|slot pairs back to false
				for (let p = 0; p < pendingList.length; p++) {
					let pendingSplits = pendingList[p].split("§");
					let tt_id: number = Number(pendingSplits[0]);
					let slot = pendingSplits[1];

					await timetableRepository.updateTimetableSlot(tt_id, slot, "available");
				}
				// set schedule row to faield
				await scheduletablesRepository.updateScheduleRow("failed", schedule_id);
				// reset all tt_id|slot pairs by simply setting it back to null
				await pendingRepository.addPending(null, courseDetails.pending_id);
				// course.scheduled = false
				await courseRepository.setScheduled(false, course_id);
			}
		}

		res.status(200).json({
			message: 'Scheduling completed successfully. Course ID: ' + course_id,
			schedule_id: schedule_id
		});
	}

}

