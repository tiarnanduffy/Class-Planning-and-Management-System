'use client'
// import { doReScheduleAction, doScheduleAction } from "@/app/lib/actions";
import { doReScheduleAction } from "@/app/lib/actions";
import { ClassOrder, ConstraintsTable, Courses, Failed, ModuleOrder, Modules, Reason, Rooms, Schedule, Succeeded, Suggestion, Users } from "@/app/lib/definitions";
import { ArrowPathIcon, CheckCircleIcon, CheckIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useState } from "react";
import ModuleClickHandler from "./outcome-module-click-handler";
import { Button } from "../button";
import { GoBackToTimetablePage } from "./buttons";
import Success from "./success";
import Failure from "./failure";
import Collapsible from "../collapsible";
import PieChartComponent from "./pie-chart-component";


export default function Form({ scheduleRow, succeededRows, failedRows, suggestionRows, reasonRows, course, modules, rooms, lecturers, constraintsTable, moduleOrder, classOrder }: { scheduleRow: Schedule, succeededRows: Succeeded[], failedRows: Failed[], suggestionRows: Suggestion[], reasonRows: Reason[], course: Courses, modules: Modules[], rooms: Rooms[], lecturers: Users[], constraintsTable: ConstraintsTable, moduleOrder: ModuleOrder[], classOrder: ClassOrder[] }) {

    const [selectedModule, setSelectedModule] = useState<Modules | undefined>(undefined);
    const [moduleSucceededRowsArray, setModuleSucceededRowsArray] = useState<Succeeded[]>([]);
    const [moduleFailedRowsArray, setModuleFailedRowsArray] = useState<Failed[]>([]);
    const [succeededModules, setSucceededModules] = useState<Modules[]>([]);
    const [failedModules, setFailedModules] = useState<Modules[]>([]);
    const [moduleReasons, setModuleReasons] = useState<Reason[]>([]);
    const [lecturer, setLecturer] = useState<Users>();
    const [lecRoomLeewayText, setLecRoomLeewayText] = useState<string>(constraintsTable.lec_room_leeway);
    const [tutRoomLeewayText, setTutRoomLeewayText] = useState<string>(constraintsTable.tut_room_leeway);
    const [praRoomLeewayText, setPraRoomLeewayText] = useState<string>(constraintsTable.pra_room_leeway);
    const [labRoomLeewayText, setLabRoomLeewayText] = useState<string>(constraintsTable.lab_room_leeway);
    const [advRoomLeewayText, setAdvRoomLeewayText] = useState<string>(constraintsTable.adv_room_leeway);
    const [lecStuLeewayText, setLecStuLeewayText] = useState<string>(constraintsTable.lec_stu_leeway);
    const [tutStuLeewayText, setTutStuLeewayText] = useState<string>(constraintsTable.tut_stu_leeway);
    const [praStuLeewayText, setPraStuLeewayText] = useState<string>(constraintsTable.pra_stu_leeway);
    const [labStuLeewayText, setLabStuLeewayText] = useState<string>(constraintsTable.lab_stu_leeway);
    const [advStuLeewayText, setAdvStuLeewayText] = useState<string>(constraintsTable.adv_stu_leeway);
    const [lecClassesPerDayText, setLecClassesPerDayText] = useState<string>(constraintsTable.lec_classes_per_day);
    const [tutClassesPerDayText, setTutClassesPerDayText] = useState<string>(constraintsTable.tut_classes_per_day);
    const [praClassesPerDayText, setPraClassesPerDayText] = useState<string>(constraintsTable.pra_classes_per_day);
    const [labClassesPerDayText, setLabClassesPerDayText] = useState<string>(constraintsTable.lab_classes_per_day);
    const [advClassesPerDayText, setAdvClassesPerDayText] = useState<string>(constraintsTable.adv_classes_per_day);
    const [useSubLecturerText, setUseSubLecturerText] = useState<string>(constraintsTable.use_sub_lecturer ? "Yes" : "No");
    const [lecRoomLeewayTextColour, setLecRoomLeewayTextColour] = useState<string>("");
    const [tutRoomLeewayTextColour, setTutRoomLeewayTextColour] = useState<string>("");
    const [praRoomLeewayTextColour, setPraRoomLeewayTextColour] = useState<string>("");
    const [labRoomLeewayTextColour, setLabRoomLeewayTextColour] = useState<string>("");
    const [advRoomLeewayTextColour, setAdvRoomLeewayTextColour] = useState<string>("");
    const [lecStuLeewayTextColour, setLecStuLeewayTextColour] = useState<string>("");
    const [tutStuLeewayTextColour, setTutStuLeewayTextColour] = useState<string>("");
    const [praStuLeewayTextColour, setPraStuLeewayTextColour] = useState<string>("");
    const [labStuLeewayTextColour, setLabStuLeewayTextColour] = useState<string>("");
    const [advStuLeewayTextColour, setAdvStuLeewayTextColour] = useState<string>("");
    const [lecClassesPerDayTextColour, setLecClassesPerDayTextColour] = useState<string>("");
    const [tutClassesPerDayTextColour, setTutClassesPerDayTextColour] = useState<string>("");
    const [praClassesPerDayTextColour, setPraClassesPerDayTextColour] = useState<string>("");
    const [labClassesPerDayTextColour, setLabClassesPerDayTextColour] = useState<string>("");
    const [advClassesPerDayTextColour, setAdvClassesPerDayTextColour] = useState<string>("");
    const [applyText, setApplyText] = useState<string>("Apply");
    const [applyButtonColour, setApplyButtonColour] = useState<string>("bg-gray-300");
    const [applyButtonDisabled, setApplyButtonDisabled] = useState<boolean>(false);
    const [displayMessage, setDisplayMessage] = useState(true);

    // When outcome page first displayed, the succeeded/failed classes is empty as no module in the succeeded/failed module list has been selected
    useEffect(() => {
        if (!selectedModule) {
            setModuleSucceededRowsArray([]);
            setModuleFailedRowsArray([]);
        }
    }, [selectedModule]);

    useEffect(() => {
        // Initialise succeeded and failed rows arrays with all rows
        setModuleSucceededRowsArray(succeededRows);
        setModuleFailedRowsArray(failedRows);

        // Filter modules associated with succeeded rows
        const succeededModuleIds = succeededRows.map(row => row.module_id);
        const modulesAssociatedWithSucceeded = modules.filter(module => succeededModuleIds.includes(module.module_id));

        // Filter modules associated with failed rows
        const failedModuleIds = failedRows.map(row => row.module_id);
        const failedModuleRows = modules.filter(module => failedModuleIds.includes(module.module_id));

        // fullySucceededModules logic. Ensures modules that have a failed class are in the failed module list rather than succeeded modules list
        const fullySucceededModules = modulesAssociatedWithSucceeded.filter(module => !failedModuleRows.find(failedModule => failedModule.module_id === module.module_id));
        setSucceededModules(fullySucceededModules);
        setFailedModules(failedModuleRows);

        const filteredReasonRows = reasonRows.filter(reasonRow =>
            failedRows.some(failedRow =>
                failedRow.module_id === reasonRow.module_id && failedRow.classtype === reasonRow.classtype
            )
        );
        setModuleReasons(filteredReasonRows);
    }, [succeededRows, failedRows, modules]);

    const handleModuleClick = (clickedModule: Modules) => {
        setSelectedModule(clickedModule);

        const moduleSucceededRows = succeededRows.filter((rows) => rows.module_id === clickedModule.module_id);
        const moduleFailedRows = failedRows.filter((rows) => rows.module_id === clickedModule.module_id);

        setModuleSucceededRowsArray(moduleSucceededRows);
        setModuleFailedRowsArray(moduleFailedRows);

        const lecturerId = clickedModule.user_id;
        const lecturer = lecturers.find((lecturer) => lecturer.user_id === lecturerId);
        setLecturer(lecturer);
    };

    // Displays succeeded and failed classes on module click through filtering of module_id
    const filteredSucceededRows = moduleSucceededRowsArray.filter(row => row.module_id === selectedModule?.module_id);
    const filteredFailedRows = moduleFailedRowsArray.filter(row => row.module_id === selectedModule?.module_id);

    const classTypeCountsMap: Map<string, number> = new Map();

    // Function to get the index for each classtype
    const getClassTypeIndex = (classtype: string): number => {
        if (!classTypeCountsMap.has(classtype)) {
            classTypeCountsMap.set(classtype, 0);
        }
        const count = classTypeCountsMap.get(classtype)! + 1;
        classTypeCountsMap.set(classtype, count);
        return count;
    };

    const getRoomName = (room_id: number) => {
        const room = rooms.find(room => room.room_id === room_id);
        return room ? room.room_name : "Unknown";
    };
    const getRoomCap = (room_id: number) => {
        const room = rooms.find(room => room.room_id === room_id);
        return room ? room.capacity : "Unknown";
    };
    const getLecturerName = (user_id: number) => {
        const lecturer = lecturers.find(lecturer => lecturer.user_id === user_id);
        return lecturer ? lecturer.firstname + " " + lecturer?.lastname : "Unknown";
    };

    const convertConstraintKey = (key: string): string => {
        switch (key) {
            case 'constraints_id':
                return 'Constraints ID'
            case 'schedule_id':
                return 'Schedule ID'
            case 'traversal_order':
                return 'Traversal Order';
            case 'module_order_type':
                return 'Module Order Type'
            case 'lec_room_leeway':
                return 'Lecture Room Leeway';
            case 'tut_room_leeway':
                return 'Tutorial Room Leeway';
            case 'pra_room_leeway':
                return 'Practical Room Leeway'
            case 'lab_room_leeway':
                return 'Lab Room Leeway'
            case 'adv_room_leeway':
                return 'Advisory Room Leeway'
            case 'lec_stu_leeway':
                return 'Lecture Student Leeway'
            case 'tut_stu_leeway':
                return 'Tutorial Student Leeway'
            case 'pra_stu_leeway':
                return 'Practical Student Leeway'
            case 'lab_stu_leeway':
                return 'Lab Student Leeway'
            case 'adv_stu_leeway':
                return 'Advisory Student Leeway'
            case 'lec_classes_per_day':
                return 'Lecture Classes per Day'
            case 'tut_classes_per_day':
                return 'Tutorial Classes per Day'
            case 'pra_classes_per_day':
                return 'Practical Classes per Day'
            case 'lab_classes_per_day':
                return 'Lab Classes per Day'
            case 'adv_classes_per_day':
                return 'Advisory Classes per Day'
            default:
                return key; // If key doesn't match any case, return it unchanged
        }
    };

    const course_id = course.course_id

    const slotsArray: string[] = ["m9", "m10", "m11", "m12", "m13", "m14", "m15", "m16",
        "t9", "t10", "t11", "t12", "t13", "t14", "t15", "t16",
        "w9", "w10", "w11", "w12", "w13", "w14", "w15", "w16",
        "th9", "th10", "th11", "th12", "th13", "th14", "th15", "th16",
        "f9", "f10", "f11", "f12", "f13", "f14", "f15", "f16"];

    const getModuleName = (moduleId: number): string | undefined => {
        const module = modules.find(module => module.module_id === moduleId);
        return module ? module.module_name : undefined;
    };

    function renderSlotRows(slotsArray: string[], filteredSucceededRows: Succeeded[]) {
        return slotsArray.map((value, index) => {
            const matchingRow = filteredSucceededRows.find(row => row.slot === value);
            backgroundColour = setClassColour(matchingRow?.classtype);
            return (
                <div key={index} className={`grid grid-cols-2 border border-black-10 py-1 px-3 text-sm ${backgroundColour}`}>
                    <div>{value}</div>
                    <div>{matchingRow ? getModuleName(matchingRow.module_id) : ""}  {matchingRow?.classtype}</div>
                </div>
            );
        });
    }

    function showSubLecOption() {
        if (constraintsTable.use_sub_lecturer == false) {
            return (
                <div>
                    <div className="grid grid-cols-2 border border-black-10 ">
                        <div className="pl-3 py-5 font-medium">
                            Use Substitute Lecturer if needed?
                        </div>
                        <div className="relative py-3 pl-6 pr-3">
                            <button
                                onClick={(event) => handleApply('use_sub_lec', "Yes", event)}
                                className={`flex h-7 items-center rounded-lg ${applyButtonColour} px-4 text-sm font-medium transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
                            >
                                {applyText}
                                <CheckIcon className="h-5 md:ml-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    function successOrFailureText() {
        if (scheduleRow.status === 'scheduled') {
            return (
                <div>
                    <h1 className="flex rounded-lg text-xl font-normal items-center">
                        {course.course_name} - Schedule Outcome
                        <CheckCircleIcon className="h-5 pl-5 pr-2" />
                        <p className="text-lime-700">Success</p>
                    </h1>
                    <h2>

                    </h2>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col rounded-lg text-xl font-normal items-center">
                    <h1 className="mb-2">
                        {course.course_name} - Schedule Outcome
                    </h1>
                    <XCircleIcon className="h-5 px-12" />
                    <p className="px-12 text-red-700">Failure</p>
                </div>
            )
        }
    }

    let backgroundColour: string = "bg-white";

    // Sets the colour of displayed class based on class type
    function setClassColour(classtype: string | undefined): string {
        switch (classtype) {
            case 'Lecture':
                backgroundColour = "bg-amber-100";
                break;
            case 'Tutorial':
                backgroundColour = "bg-lime-100";
                break;
            case 'Practical':
                backgroundColour = "bg-pink-200";
                break;
            case 'Lab':
                backgroundColour = "bg-purple-200";
                break;
            case 'Advisory':
                backgroundColour = "bg-teal-200";
                break;
            default:
                backgroundColour = 'bg-white';
        }
        return backgroundColour;
    }

    const moduleOrderType = constraintsTable.module_order_type;
    let orderedModule: string[] = []; // Initialise the array
    orderedModule.push(constraintsTable.module_order_type);
    if (moduleOrderType === 'byPriority') {
        for (let i = 0; i < moduleOrder.length; i++) {
            orderedModule.push(moduleOrder[i].module_id.toString())
        }
    }

    const classOrderArray: string[] = [];
    for (let i = 0; i < classOrder.length; i++) {
        classOrderArray.push(classOrder[i].class_name);
    }

    // Function that changes the value/type of a constraint when suggestion for constraint is applied
    function handleApply(constraint_type: string, required_leeway: string, event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const grayBgColour = "bg-gray-300";

        switch (constraint_type) {
            case 'lec_room_leeway':
                setLecRoomLeewayText(required_leeway);
                setLecRoomLeewayTextColour("lime-green-700");
                constraintsTable.lec_room_leeway = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'tut_room_leeway':
                setTutRoomLeewayText(required_leeway);
                setTutRoomLeewayTextColour("lime-green-700");
                constraintsTable.tut_room_leeway = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'pra_room_leeway':
                setPraRoomLeewayText(required_leeway);
                setPraRoomLeewayTextColour("lime-green-700");
                constraintsTable.pra_room_leeway = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'lab_room_leeway':
                setLabRoomLeewayText(required_leeway);
                setLabRoomLeewayTextColour("lime-green-700");
                constraintsTable.lab_room_leeway = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'adv_room_leeway':
                setAdvRoomLeewayText(required_leeway);
                setAdvRoomLeewayTextColour("lime-green-700");
                constraintsTable.adv_room_leeway = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'lec_stu_leeway':
                setLecStuLeewayText(required_leeway);
                setLecStuLeewayTextColour("lime-green-700");
                constraintsTable.lec_stu_leeway = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'tut_stu_leeway':
                setTutStuLeewayText(required_leeway);
                setTutStuLeewayTextColour("lime-green-700");
                constraintsTable.tut_stu_leeway = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'pra_stu_leeway':
                setPraStuLeewayText(required_leeway);
                setPraStuLeewayTextColour("lime-green-700");
                constraintsTable.pra_stu_leeway = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'lab_stu_leeway':
                setLabStuLeewayText(required_leeway);
                setLabStuLeewayTextColour("lime-green-700");
                constraintsTable.lab_stu_leeway = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'adv_stu_leeway':
                setAdvStuLeewayText(required_leeway);
                setAdvStuLeewayTextColour("lime-green-700");
                constraintsTable.adv_stu_leeway = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'lec_classes_per_day':
                setLecClassesPerDayText(required_leeway);
                setLecClassesPerDayTextColour("lime-green-700");
                constraintsTable.lec_classes_per_day = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'tut_classes_per_day':
                setTutClassesPerDayText(required_leeway);
                setTutClassesPerDayTextColour("lime-green-700");
                constraintsTable.tut_classes_per_day = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'pra_classes_per_day':
                setPraClassesPerDayText(required_leeway);
                setPraClassesPerDayTextColour("lime-green-700");
                constraintsTable.pra_classes_per_day = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'lab_classes_per_day':
                setLabClassesPerDayText(required_leeway);
                setLabClassesPerDayTextColour("lime-green-700");
                constraintsTable.lab_classes_per_day = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'adv_classes_per_day':
                setAdvClassesPerDayText(required_leeway);
                setAdvClassesPerDayTextColour("lime-green-700");
                constraintsTable.adv_classes_per_day = required_leeway;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            case 'use_sub_lec':
                setUseSubLecturerText("Yes");
                constraintsTable.use_sub_lecturer = true;
                setApplyButtonColour(grayBgColour);
                setApplyButtonDisabled(true);
                break;
            default:
                // Handle default case if needed
                break;
        }

    }

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>, course_id: number, constraintsTable: ConstraintsTable, classOrderArray: string[], orderedModule: string[]) => {
        event.preventDefault();
        doReScheduleAction(course_id, constraintsTable, classOrderArray, orderedModule);
    }

    // Define a function to filter out duplicate suggestions
    const filterUniqueSuggestions = (suggestionRows: Suggestion[]) => {
        return suggestionRows.reduce((uniqueSuggestions: Suggestion[], suggestion) => {
            // Check if there is already a suggestion with the same constraint_type and required_leeway
            const existingSuggestion = uniqueSuggestions.find(
                (s) => s.constraint_type === suggestion.constraint_type && s.required_leeway === suggestion.required_leeway
            );
            // If not found, add the suggestion to the uniqueSuggestions array
            if (!existingSuggestion) {
                uniqueSuggestions.push(suggestion);
            }
            return uniqueSuggestions;
        }, []);
    };

    // Call the filterUniqueSuggestions function passing your suggestionRows array
    const uniqueSuggestions = filterUniqueSuggestions(suggestionRows);

    const numSucceededRows = succeededRows.length;
    const numFailedRows = failedRows.length;
    const numSucceededModules = succeededModules.length;
    const numFailedModules = failedModules.length;

    const pieChartDataModules = [
        { name: 'Succeeded Modules', value: numSucceededModules },
        { name: 'Failed Modules', value: numFailedModules },
    ];

    const pieChartDataRows = [
        { name: 'Succeeded Rows', value: numSucceededRows },
        { name: 'Failed Rows', value: numFailedRows },
    ];


    // Delay applied so that success or failure icon is displayed to the user for a sufficent period
    useEffect(() => {
        const displayTime = 2000;
        const timer = setTimeout(() => {
            setDisplayMessage(false);
        }, displayTime);

        return () => clearTimeout(timer);
    }, []);

    function successOrFailureDisplay() {
        if (scheduleRow.status === 'scheduled') {
            return <Success />;
        } else {
            return <Failure />;
        }
    }

    // If the schedule was unsuccessful the pie charts are displayed showing succeeded to failed module and class ratio
    function showCharts() {
        if (scheduleRow.status !== 'scheduled') {
            return (
                <div className="gap bg-gray-50">
                    <Collapsible title="Statistics">
                    <div className="grid grid-cols-2 items-center">
                        <div className="pl-20">
                            <h1 className="pl-20 pt-10 ">Succeeded/Failed Modules</h1>
                            <div className="flex">
                                <h2 className="pl-20 text-lime-700">{numSucceededModules} Succeeded</h2>
                                <h2 className="px-10 text-red-700">{numFailedModules} Failed</h2>
                            </div>
                            <div className="pl-12">
                                <PieChartComponent data={pieChartDataModules} width={300} height={300} />
                            </div>
                        </div>
                        <div className="pl-20">
                            <h1 className="pl-20 pt-10 ">Succeeded/Failed Classes</h1>
                            <div className="flex">
                                <h2 className="pl-20 text-lime-700">{numSucceededRows} Succeeded</h2>
                                <h2 className="px-10 text-red-700">{numFailedRows} Failed</h2>
                            </div>
                            <div className="pl-12">
                                <PieChartComponent data={pieChartDataRows} width={300} height={300} />
                            </div>
                        </div>
                    </div>
                    </Collapsible>
                </div>
            )
        }
    }

    return (

        <div className="flex flex-col h-full">
            {displayMessage && successOrFailureDisplay()}

            <div className="flex-grow">

                <div className="flex rounded-lg text-xl font-normal justify-center">{successOrFailureText()}</div>
                {showCharts()}
                {/* Select Module */}
                <div className="gap grid grid-cols-2">
                    <div>
                        <p>Succeeded Modules:</p>
                        <div>
                            {succeededModules.map((module) => (
                                <ModuleClickHandler key={module.module_id} module={module} onModuleClick={handleModuleClick} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <p>Failed Modules:</p>
                        <div>
                            {failedModules.map((module) => (
                                <ModuleClickHandler key={module.module_id} module={module} onModuleClick={handleModuleClick} />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Succeeded and Failed Rows */}
                <div className="text-gray-900 gap">
                    <div className="grid grid-cols-2">
                        <div>
                            <p>Succeeded Classes: </p>
                            <div className="grid grid-cols-4 grid-rows-1 rounded-lg text-left text-sm font-normal">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            {selectedModule && filteredSucceededRows.map((row, index) => (

                                <div className="grid grid-cols-4 bg-green-300 border-b py-1 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg" key={row.succeeded_id}>
                                    <div>{row.classtype} {getClassTypeIndex(row.classtype)}</div>
                                    <div>Slot {row.slot}</div>
                                    <div>R. {getRoomName(row.room_id)} ({getRoomCap(row.room_id)} cap.)</div>
                                    <div>{getLecturerName(row.user_id)}</div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <p>Failed Classes Reasons: </p>
                            <div className="grid rounded-lg text-left text-sm font-normal">
                                <div></div>
                            </div>
                            {selectedModule && filteredFailedRows.map((row, index) => (
                                <div className="grid" key={row.failed_id}>
                                    <div>
                                        {/* Check if there are corresponding moduleReasons */}
                                        {moduleReasons
                                            .filter(reason => reason.module_id === row.module_id)
                                            .map((reason, index) => (
                                                <div key={index} className="bg-red-300 border-b py-1 px-2 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                                                    <h1 className="font-bold rounded-lg text-underlined">{row.classtype} {(parseInt(row.class_num)+1)}</h1>
                                                    {/* Split reason.reason by '\n' and map over the resulting array */}
                                                    {reason.reason.split('\n').map((line, idx) => (
                                                        <p key={idx} className={idx === 0 ? 'font-medium' : ''}>{line}</p>
                                                    ))}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Timetable */}
                <div className="text-gray-900 gap">
                    <Collapsible title="Slots">
                    <div className="grid grid-cols-5 grid-rows-1 border border-solid  border-black flex justify-center text-center items-center text-xs">
                        <b className="bg-amber-100">Lecture</b>
                        <b className="bg-lime-100">Tutorial</b>
                        <b className="bg-pink-200">Practical</b>
                        <b className="bg-purple-200">Lab</b>
                        <b className="bg-teal-200">Advisory</b>
                    </div>
                    <div>
                        <p className="pt-3"></p>
                        {renderSlotRows(slotsArray, filteredSucceededRows)}
                    </div>
                    </Collapsible>
                </div>
                {/* Constraints and Suggestions */}
                <div className="text-gray-900 gap">
                    <div className="grid grid-cols-2">
                        <div>
                            <p className="pl-3">Constraints:</p>
                            <div className="grid grid-cols-2 border border-black-10 py-1 px-3 ">
                                <div className="font-medium">
                                    <div>Module Order:</div>
                                    <div>Traversal Order:</div>
                                    <div>Lecture Room Leeway:</div>
                                    <div>Tutorial Room Leeway:</div>
                                    <div>Practical Room Leeway:</div>
                                    <div>Lab Room Leeway:</div>
                                    <div>Advisory Room Leeway:</div>
                                    <div>Student Lecture Leeway:</div>
                                    <div>Student Tutorial Leeway:</div>
                                    <div>Student Practical Leeway:</div>
                                    <div>Student Lab Leeway:</div>
                                    <div>Student Advisory Leeway:</div>
                                    <div>Lecture Classes Per Day:</div>
                                    <div>Tutorial Classes Per Day:</div>
                                    <div>Practical Classes Per Day:</div>
                                    <div>Lab Classes Per Day:</div>
                                    <div>Advisory Classes Per Day:</div>
                                    <div>Uses Subtitute Lecturer?:</div>
                                </div>
                                <div>
                                    <div id="moduleOrder">{constraintsTable.module_order_type}</div>
                                    <div id="traversalOrder" >{constraintsTable.traversal_order}</div>
                                    <div id="lecRoomLeeway" className={lecRoomLeewayTextColour}>{lecRoomLeewayText}</div>
                                    <div id="tutRoomLeeway" className={tutRoomLeewayTextColour}>{tutRoomLeewayText}</div>
                                    <div id="praRoomLeeway" className={praRoomLeewayTextColour}>{praRoomLeewayText}</div>
                                    <div id="labRoomLeeway" className={labRoomLeewayTextColour}>{labRoomLeewayText}</div>
                                    <div id="advRoomLeeway" className={advRoomLeewayTextColour}>{advRoomLeewayText}</div>
                                    <div id="lecStuLeeway" className={lecStuLeewayTextColour}>{lecStuLeewayText}</div>
                                    <div id="tutStuLeeway" className={tutStuLeewayTextColour}>{tutStuLeewayText}</div>
                                    <div id="praStuLeeway" className={praStuLeewayTextColour}>{praStuLeewayText}</div>
                                    <div id="labStuLeeway" className={labStuLeewayTextColour}>{labStuLeewayText}</div>
                                    <div id="advStuLeeway" className={advStuLeewayTextColour}>{advStuLeewayText}</div>
                                    <div id="lecClassesPerDay" className={lecClassesPerDayTextColour}>{lecClassesPerDayText}</div>
                                    <div id="tutClassesPerDay" className={tutClassesPerDayTextColour}>{tutClassesPerDayText}</div>
                                    <div id="praClassesPerDay" className={praClassesPerDayTextColour}>{praClassesPerDayText}</div>
                                    <div id="labClassesPerDay" className={labClassesPerDayTextColour}>{labClassesPerDayText}</div>
                                    <div id="advClassesPerDay" className={advClassesPerDayTextColour}>{advClassesPerDayText}</div>
                                    <div id="useSubLecturerer" >{useSubLecturerText}</div>
                                </div>

                            </div>
                        </div>
                        <div>
                            <p className="pl-3">Suggestions:</p>
                            <div>
                                {showSubLecOption()}
                                {uniqueSuggestions.map((row) => (
                                    <div>
                                        <div className="grid grid-cols-2 border border-black-10 ">
                                            <div className="pl-3 py-5 font-medium">
                                                {convertConstraintKey(row.constraint_type)} requires {row.required_leeway}%
                                            </div>
                                            <div className="relative py-3 pl-6 pr-3">
                                                <button
                                                    onClick={(event) => handleApply(row.constraint_type, row.required_leeway.toString(), event)}
                                                    className={`flex h-7 items-center rounded-lg ${applyButtonColour} px-4 text-sm font-medium transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}

                                                >
                                                    {applyText}
                                                    <CheckIcon className="h-5 md:ml-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <GoBackToTimetablePage />
                <form onSubmit={(event) => handleFormSubmit(event, course_id, constraintsTable, classOrderArray, orderedModule)}>
                    <Button type="submit" disabled={scheduleRow.status === 'scheduled'} className={scheduleRow.status === 'scheduled' ? "bg-gray-300 h-10" : "bg-blue-600 h-10"}>
                        Re-Schedule
                        <ArrowPathIcon className="h-5 md:ml-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}
