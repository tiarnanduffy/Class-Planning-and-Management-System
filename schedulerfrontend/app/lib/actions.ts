'use server';

import { createCourse, createLecturerUser, createModule2, deleteCourse, deleteUser, doSchedule, getScheduleRow, reserveSlot, resetTimetables, selectModulesForStudent, selectModulesForStudentUser, updateCourse, updateLecturerUser, updateStudentUser } from '@/app/lib/data';
import { updateModule } from '@/app/lib/data';
import { deleteModule } from '@/app/lib/data';
import { createBuilding } from '@/app/lib/data';
import { updateBuilding } from '@/app/lib/data';
import { deleteBuilding } from '@/app/lib/data';
import { createRoom } from '@/app/lib/data';
import { updateRoom } from '@/app/lib/data';
import { deleteRoom } from '@/app/lib/data';


import { createStudentUser } from '@/app/lib/data';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Constraints, ConstraintsTable, Modules } from './definitions';

export async function createModuleAction(formData: FormData) {
    const rawFormData = {
        course_id: Number(formData.get('course_id')) || 0,
        module_name: formData.get('module_name')?.toString() || '',
        module_code: formData.get('module_code')?.toString() || '',
        module_year: Number(formData.get('module_year')) || 0,
        user_id: Number(formData.get('lecturer_id')) || 0,
        enrolled_students: Number(formData.get('enrolled_students')) || 0,
        capacity: 0,
        sub_lecturer_id: Number(formData.get('sub_lecturer_id')) || 0,
    };

    // Checks if the "Required facility is checked". If not the facility for the class is set to null.
    const lec_fac_req = formData.get('lecture_facility_required') === 'on' || formData.get('lecture_facility_required') === null;
    const tut_fac_req = formData.get('tutorial_facility_required') === 'on' || formData.get('tutorial_facility_required') === null;
    const prac_fac_req = formData.get('practical_facility_required') === 'on' || formData.get('practical_facility_required') === null;
    const lab_fac_req = formData.get('lab_facility_required') === 'on' || formData.get('lab_facility_required') === null;
    const adv_fac_req = formData.get('advisory_facility_required') === 'on' || formData.get('advisory_facility_required') === null;

    const classRawFormData = {
        num_lectures: Number(formData.get('num_lectures')) || 0,
        lecture_facility: lec_fac_req ? formData.get('lecture_facility')?.toString() || null : null,
        num_tutorials: Number(formData.get('num_tutorials')) || 0,
        tutorial_facility: tut_fac_req ? formData.get('tutorial_facility')?.toString() || null : null,
        num_practicals: Number(formData.get('num_practicals')) || 0,
        practical_facility: prac_fac_req ? formData.get('practical_facility')?.toString() || null : null,
        num_labs: Number(formData.get('num_labs')) || 0,
        lab_facility: lab_fac_req ? formData.get('lab_facility')?.toString() || null : null,
        num_advisories: Number(formData.get('num_advisories')) || 0,
        advisory_facility: adv_fac_req ? formData.get('advisory_facility')?.toString() || null : null,
    };

    const moduleData = {
        module: rawFormData,
        classtype: classRawFormData
    };

    await createModule2(moduleData);
    revalidatePath('/dashboard/modules');
    redirect('/dashboard/modules');
}

export async function updateModuleAction(module_id: number, classtype_id: number, formData: FormData) {
    const rawFormData = {
        course_id: Number(formData.get('course_id')) || 0,
        module_name: formData.get('module_name')?.toString() || '',
        module_code: formData.get('module_code')?.toString() || '',
        module_year: Number(formData.get('module_year')) || 0,
        user_id: Number(formData.get('lecturer_id')) || 0,
        enrolled_students: Number(formData.get('enrolled_students')) || 0,
        capacity: 0,
        classtype_id: classtype_id,
        sub_lecturer_id: Number(formData.get('sub_lecturer_id')) || 0,
        module_id: module_id
    };

    // Boolean value that sets to "true" if the checkbox is checked
    const lec_fac_req = formData.get('lecture_facility_required') === 'on';
    const tut_fac_req = formData.get('tutorial_facility_required') === 'on';
    const prac_fac_req = formData.get('practical_facility_required') === 'on';
    const lab_fac_req = formData.get('lab_facility_required') === 'on';
    const adv_fac_req = formData.get('advisory_facility_required') === 'on';

    // Checks if the "Required facility is checked". If not the facility for the class is set to null.
    const lecture_facility = lec_fac_req ? formData.get('lecture_facility')?.toString() || null : null;
    const tutorial_facility = tut_fac_req ? formData.get('tutorial_facility')?.toString() || null : null;
    const practical_facility = prac_fac_req ? formData.get('practical_facility')?.toString() || null : null;
    const lab_facility = lab_fac_req ? formData.get('lab_facility')?.toString() || null : null;
    const advisory_facility = adv_fac_req ? formData.get('advisory_facility')?.toString() || null : null;

    const classRawFormData = {
        num_lectures: Number(formData.get('num_lectures')) || 0,
        lecture_facility: lecture_facility,
        num_tutorials: Number(formData.get('num_tutorials')) || 0,
        tutorial_facility: tutorial_facility,
        num_practicals: Number(formData.get('num_practicals')) || 0,
        practical_facility: practical_facility,
        num_labs: Number(formData.get('num_labs')) || 0,
        lab_facility: lab_facility,
        num_advisories: Number(formData.get('num_advisories')) || 0,
        advisory_facility: advisory_facility,
        classtype_id: classtype_id
    };

    const moduleData = {
        module: rawFormData,
        classtype: classRawFormData
    };

    await updateModule(moduleData);
    revalidatePath('/dashboard/modules');
    redirect('/dashboard/modules');
}

export async function deleteModuleAction(module_id: number) {
    await deleteModule(module_id);
    revalidatePath('/dashboard/modules');
    redirect('/dashboard/modules');
}


export async function createCourseAction(formData: FormData) {
    const rawFormData = {
        course_name: formData.get('course_name')?.toString() || '',
        school: formData.get('school')?.toString() || '',
        qualification: formData.get('qualification')?.toString() || '',
        years: Number(formData.get('years')) || 0,
        building_id: formData.get('building_id')?.toString() || '',
    };

    await createCourse(rawFormData);
    revalidatePath('/dashboard/courses');
    redirect('/dashboard/courses');
}

export async function updateCourseAction(course_id: number, formData: FormData) {
    const rawFormData = {
        course_name: formData.get('course_name')?.toString() || '',
        school: formData.get('school')?.toString() || '',
        qualification: formData.get('qualification')?.toString() || '',
        years: Number(formData.get('years')) || 0,
        building_id: Number(formData.get('building_id')) || 0,
        course_id: course_id
    };
    await updateCourse(rawFormData);
    revalidatePath('/dashboard/courses');
    redirect('/dashboard/courses');
}


export async function deleteCourseAction(course_id: number) {
    await deleteCourse(course_id);
    revalidatePath('/dashboard/course');
    redirect('/dashboard/courses');
}

export async function createBuildingAction(formData: FormData) {
    const rawFormData = {
        building_name: formData.get('building_name')?.toString() || '',
        school: formData.get('school')?.toString() || ''
    };
    await createBuilding(rawFormData);
    revalidatePath('/dashboard/buildings')
    redirect('/dashboard/buildings');
}

export async function updateBuildingAction(building_id: number, formData: FormData) {
    const rawFormData = {
        building_name: formData.get('building_name')?.toString() || '',
        school: formData.get('school')?.toString() || '',
        building_id: building_id
    };
    await updateBuilding(rawFormData);
    revalidatePath('/dashboard/buildings');
    redirect('/dashboard/buildings');
}

export async function deleteBuildingAction(building_id: number) {
    await deleteBuilding(building_id);
    revalidatePath('/dashboard/buildings');
    redirect('/dashboard/buildings');
}

export async function createRoomAction(formData: FormData) {
    
    // Checks if the "Required facility is checked". If not the facility for the room is set to null.
    const fac_req = formData.get('facility_required') === 'on' || formData.get('facility_required') === null;
    const facility = fac_req ? formData.get('facility')?.toString() || null : null;

    const rawFormData = {
        room_name: formData.get('room_name')?.toString() || '',
        building_id: Number(formData.get('building_id')) || 0,
        capacity: Number(formData.get('capacity')) || 0,
        facility: facility
    };
    await createRoom(rawFormData);
    revalidatePath('/dashboard/rooms')
    redirect('/dashboard/rooms');
}

export async function updateRoomAction(room_id: number, formData: FormData) {

    // Boolean value that sets to "true" if the checkbox is checked
    const fac_req = formData.get('facility_required') === 'on';
    // Checks if the "Required facility is checked". If not the facility for the room is set to null.
    const facility = fac_req ? formData.get('facility')?.toString() || null : null;

    const rawFormData = {
        room_name: formData.get('room_name')?.toString() || '',
        building_id: Number(formData.get('building_id')) || 0,
        capacity: Number(formData.get('capacity')) || 0,
        facility: facility,
        room_id: room_id
    };

    await updateRoom(rawFormData);
    revalidatePath('/dashboard/rooms');
    redirect('/dashboard/rooms');
}

export async function deleteRoomAction(room_id: number) {
    await deleteRoom(room_id);
    revalidatePath('/dashboard/rooms');
    redirect('/dashboard/rooms');
}

export async function createStudentUserAction(formData: FormData) {
    const rawFormData = {
        firstname: formData.get('firstname')?.toString() || '',
        lastname: formData.get('lastname')?.toString() || '',
        course_id: Number(formData.get('course_id')) || 0,
        course_year: Number(formData.get('course_year')) || 0,
        ss_number: Number(formData.get('ss_number')) || 0
    };
    await createStudentUser(rawFormData);
    revalidatePath('/dashboard/studentusers')
    redirect('/dashboard/studentusers');
}

export async function updateStudentUserAction(user_id: number, formData: FormData) {
    const rawFormData = {
        firstname: formData.get('firstname')?.toString() || '',
        lastname: formData.get('lastname')?.toString() || '',
        course_id: Number(formData.get('course_id')) || 0,
        course_year: Number(formData.get('course_year')) || 0,
        ss_number: Number(formData.get('ss_number')) || 0,
        user_id: user_id
    };
    await updateStudentUser(rawFormData);
    revalidatePath('/dashboard/studentusers');
    redirect('/dashboard/studentusers');
}

export async function deleteUserAction(user_id: number, pathname: string) {
    // Checks the pathname of the routing.
    // If the URL is on students it redirects to /dashboard/studentusers otherwise it redirects to /dashboard/lecturerusers
    if (pathname === '/dashboard/studentusers') {
        await deleteUser(user_id);
        revalidatePath('/dashboard/studentusers');
        redirect('/dashboard/studentusers');
    } else if (pathname === '/dashboard/lecturerusers') {
        await deleteUser(user_id);
        revalidatePath('/dashboard/lecturerusers');
        redirect('/dashboard/lecturerusers');
    }
}

export async function createLecturerUserAction(formData: FormData) {
    const rawFormData = {
        firstname: formData.get('firstname')?.toString() || '',
        lastname: formData.get('lastname')?.toString() || '',
        ss_number: Number(formData.get('ss_number')) || 0
    };
    await createLecturerUser(rawFormData);
    revalidatePath('/dashboard/lecturerusers')
    redirect('/dashboard/lecturerusers');
}

export async function updateLecturerUserAction(user_id: number, formData: FormData) {
    const rawFormData = {
        firstname: formData.get('firstname')?.toString() || '',
        lastname: formData.get('lastname')?.toString() || '',
        ss_number: Number(formData.get('ss_number')) || 0,
        user_id: user_id
    };
    await updateLecturerUser(rawFormData);
    revalidatePath('/dashboard/lecturerusers');
    redirect('/dashboard/lecturerusers');
}

export async function resetTimetablesActions() {
    await resetTimetables();
    revalidatePath('/dashboard/timetables');
    redirect('/dashboard/timetables');
}


export async function getModuleIdAction(formData: FormData) {
    const rawFormData = {
        module_id: formData.get('module_id')
    }
}

export async function doReScheduleAction(course_id: number, constraintsTable: ConstraintsTable, classOrder: string[], orderedModules: string[]) {

    const constraints: Constraints = {
        traversalOrder: constraintsTable.traversal_order,
        moduleOrder: [],
        classOrder: classOrder,
        lecRoomLeeway: constraintsTable.lec_room_leeway,
        tutRoomLeeway: constraintsTable.tut_room_leeway,
        praRoomLeeway: constraintsTable.pra_room_leeway,
        labRoomLeeway: constraintsTable.lab_room_leeway,
        advRoomLeeway: constraintsTable.adv_room_leeway,
        lecStuLeeway: constraintsTable.lec_stu_leeway,
        tutStuLeeway: constraintsTable.tut_stu_leeway,
        praStuLeeway: constraintsTable.pra_stu_leeway,
        labStuLeeway: constraintsTable.lab_stu_leeway,
        advStuLeeway: constraintsTable.adv_stu_leeway,
        lecClassesPerDay: constraintsTable.lec_classes_per_day,
        tutClassesPerDay: constraintsTable.tut_classes_per_day,
        praClassesPerDay: constraintsTable.pra_classes_per_day,
        labClassesPerDay: constraintsTable.lab_classes_per_day,
        advClassesPerDay: constraintsTable.adv_classes_per_day,
        useSubLecturer: constraintsTable.use_sub_lecturer
    }

    constraints.moduleOrder = orderedModules;
    constraints.classOrder = classOrder;

    const response = await doSchedule(course_id, constraints);
    const schedule_id: number = response.schedule_id;

    revalidatePath('/dashboard/timetables');
    redirect(`/dashboard/timetables/outcome/${schedule_id}`);
    
}

export async function doScheduleAction(formData: FormData) {
    const course_id = Number(formData.get('course_id'));

    const constraints: Constraints = {
        traversalOrder: formData.get('traversalOrder')?.toString() || '',
        moduleOrder: [],
        classOrder: [],
        lecRoomLeeway: formData.get('lecRoomLeeway')?.toString() || '',
        tutRoomLeeway: formData.get('tutRoomLeeway')?.toString() || '',
        praRoomLeeway: formData.get('praRoomLeeway')?.toString() || '',
        labRoomLeeway: formData.get('labRoomLeeway')?.toString() || '',
        advRoomLeeway: formData.get('advRoomLeeway')?.toString() || '',
        lecStuLeeway: formData.get('lecStuLeeway')?.toString() || '',
        tutStuLeeway: formData.get('tutStuLeeway')?.toString() || '',
        praStuLeeway: formData.get('praStuLeeway')?.toString() || '',
        labStuLeeway: formData.get('labStuLeeway')?.toString() || '',
        advStuLeeway: formData.get('advStuLeeway')?.toString() || '',
        lecClassesPerDay: formData.get('lecClassesPerDay')?.toString() || '',
        tutClassesPerDay: formData.get('tutClassesPerDay')?.toString() || '',
        praClassesPerDay: formData.get('praClassesPerDay')?.toString() || '',
        labClassesPerDay: formData.get('labClassesPerDay')?.toString() || '',
        advClassesPerDay: formData.get('advClassesPerDay')?.toString() || '' ,
        useSubLecturer: formData.get('useSubLecturer') !== null
    }

    // Set moduleOrder[0] to formData.get('moduleOrder')
    constraints.moduleOrder.push(formData.get('moduleOrder')?.toString() || '');

    const reorderedModuleArrayString = formData.get('reorderedModuleArray')?.toString() || '';
    const orderedModules: Modules[] = reorderedModuleArrayString ? JSON.parse(reorderedModuleArrayString) : [];

    // If moduleOrder is byPriority, populate constraints.moduleOrder with module IDs
    if (formData.get('moduleOrder') === 'byPriority' && orderedModules.length > 0) {
        let modulesIds: String[] = orderedModules.map(module => module.module_id.toString());
        constraints.moduleOrder.push(...modulesIds);
    }

    const reorderedClassArrayString = formData.get('reorderedClassOrder')?.toString() || '';
    const reorderedClassOrder: string[] = JSON.parse(reorderedClassArrayString);

    constraints.classOrder.push(...reorderedClassOrder);

    constraints.classOrder = reorderedClassOrder.map(classType => {
        switch (classType) {
            case 'Lecture(s)':
                return 'lec';
            case 'Tutorial(s)':
                return 'tut';
            case 'Practical(s)':
                return 'pra';
            case 'Lab(s)':
                return 'lab';
            case 'Advisory(s)':
                return 'adv';
            default:
                return classType;
        }
    });

    const response = await doSchedule(course_id, constraints);
    const schedule_id: number = response.schedule_id;
    const schedule = await getScheduleRow(schedule_id);
    const status = await schedule.status;

    revalidatePath('/dashboard/timetables');
    redirect(`/dashboard/timetables/outcome/${schedule_id}`);
}

export async function reserveSlotAction(slot_id: string, user_id: number) {
    await reserveSlot(slot_id);
    revalidatePath('/dashboard/lecturerhours');
    redirect(`/dashboard/lecturerhours/${user_id}`);
}

export async function redirectToDashboard() {
    redirect('/dashboard/');
}

export async function selectModulesAction(formData: FormData, student_id: number) {
    const selectedModuleIds: number[] = [];
    formData.forEach((value, key) => {
        if (key === 'selectedModules') {
            selectedModuleIds.push(Number(value));
        }
    });

    try {
        await selectModulesForStudent(selectedModuleIds, student_id);
        revalidatePath('/dashboard/selectmodules/11')
    } catch (error) {
        console.error('Error selecting modules:', error);
    }
    redirect('/dashboard/');
}

export async function selectModulesForUserAction(formData: FormData, user_id: number) {
    const selectedModuleIds: number[] = [];
    formData.forEach((value, key) => {
        if (key === 'selectedModules') {
            selectedModuleIds.push(Number(value));
        }
    });

    try {
        await selectModulesForStudentUser(selectedModuleIds, user_id);
        revalidatePath('/dashboard/')
    } catch (error) {
        console.error('Error selecting modules:', error);
    }
    redirect('/dashboard/');
}


export async function goBackToTimetablePage() {
    revalidatePath('/dashboard/timetables');
    redirect('/dashboard/timetables');
}

export async function doLoginAction(user_id: number) {

}