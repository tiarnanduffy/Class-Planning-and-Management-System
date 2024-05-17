'use client'

import { createModuleAction, doScheduleAction } from '@/app/lib/actions';
import { Courses, Modules } from '@/app/lib/definitions';
import { Rooms } from '@/app/lib/definitions';
import { Buildings } from '@/app/lib/definitions';
import {
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { ChangeEvent, useState } from 'react';
import { Reorder } from "framer-motion"


export default function Form({ courses, modules, rooms, buildings }: { courses: Courses[], modules: Modules[], rooms: Rooms[], buildings: Buildings[] }) {

    const [selectedCourse, setSelectedCourse] = useState<Courses | undefined>(undefined);
    const [buttonText, setButtonText] = useState<string>("Create Timetable");
    const [buildingRoomsArray, setBuildingRooms] = useState<Rooms[]>([]);
    const [courseModulesArray, setCourseModules] = useState<Modules[]>([]);
    const [orderModulesArray, setOrderModulesArray] = useState<Modules[]>([]);
    const [priorityOrderRequired, setPriorityOrderRequired] = useState(false);
    const [lecRoomLeeway, setLecRoomLeeway] = useState(100);
    const [tutRoomLeeway, setTutRoomLeeway] = useState(100);
    const [praRoomLeeway, setPraRoomLeeway] = useState(100);
    const [labRoomLeeway, setLabRoomLeeway] = useState(100);
    const [advRoomLeeway, setAdvRoomLeeway] = useState(100);
    const [lecStuLeeway, setLecStuLeeway] = useState(100);
    const [tutStuLeeway, setTutStuLeeway] = useState(100);
    const [praStuLeeway, setPraStuLeeway] = useState(100);
    const [labStuLeeway, setLabStuLeeway] = useState(100);
    const [advStuLeeway, setAdvStuLeeway] = useState(100);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCourseId = parseInt(e.target.value, 10);
        const selectedCourse = courses.find((course) => course.course_id === selectedCourseId);
        setSelectedCourse(selectedCourse);

        // Sets text as Rescheduled or Scheduled based on if the course has been scheduled or not
        if (selectedCourse?.scheduled == true) {
            setButtonText(`Reschedule ${selectedCourse.course_name}`)
        } else if (selectedCourse) {
            setButtonText(`Schedule ${selectedCourse.course_name}`)
        } else {

        }

        // Displays rooms from the selcted course
        const buildingRooms = rooms.filter((room) => room.building_id === selectedCourse?.building_id);
        setBuildingRooms(buildingRooms);

        // Displays modules from the selcted course
        const courseModules = modules.filter((module) => module.course_id === selectedCourse?.course_id);
        setCourseModules(courseModules);

        setOrderModulesArray(courseModules);
    };

    const reorderArray = () => {
        return (
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Drag Modules to order by scheduled
                </label>
                <Reorder.Group
                    as="ol"
                    values={orderModulesArray}
                    onReorder={setOrderModulesArray}
                >
                    {orderModulesArray.map((module) => (
                        <Reorder.Item value={module} key={module.module_id} className="w-full border-b py-3 pl-3 text-sm last-of-type:border-none">
                            {module.module_name}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
                {/* Hidden input to store the reordered module order array */}
                <input type="hidden" name="reorderedModuleArray" value={JSON.stringify(orderModulesArray)} />
            </div>
        );
    };

    const reorderClasses = () => {
        const [classOrder, setClassOrder] = useState(['Lecture(s)', 'Tutorial(s)', 'Practical(s)', 'Lab(s)', "Advisory(s)"])
        return (
            <div className="rounded-md bg-gray-50 p-4 md:p-3">
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                    Drag classtypes to set order
                </label>
                <Reorder.Group
                    as="ol"
                    values={classOrder}
                    onReorder={setClassOrder}
                >
                    {classOrder.map((classType) => (
                        <Reorder.Item value={classType} key={classType} className="w-full border-b py-3 pl-3 text-sm last-of-type:border-none">
                            {classType}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
                {/* Hidden input to store the reordered class order array */}
                <input type="hidden" name="reorderedClassOrder" value={JSON.stringify(classOrder)} />
            </div>
        );
    }

    // sets values of leeways based on slider value
    const handleLecRoomLeewayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLecRoomLeeway(parseInt(e.target.value));
    };

    const handleTutRoomLeewayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTutRoomLeeway(parseInt(e.target.value));
    };

    const handlePraRoomLeewayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPraRoomLeeway(parseInt(e.target.value));
    };

    const handleLabRoomLeewayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLabRoomLeeway(parseInt(e.target.value));
    };

    const handleAdvRoomLeewayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAdvRoomLeeway(parseInt(e.target.value));
    };

    const handleLecStudentLeewayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLecStuLeeway(parseInt(e.target.value));
    };

    const handleTutStudentLeewayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTutStuLeeway(parseInt(e.target.value));
    };

    const handlePraStudentLeewayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPraStuLeeway(parseInt(e.target.value));
    };

    const handleLabStudentLeewayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLabStuLeeway(parseInt(e.target.value));
    };

    const handleAdvStudentLeewayChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAdvStuLeeway(parseInt(e.target.value));
    };

    const selectedBuilding: Buildings | undefined = selectedCourse && courses.length > 0
        ? buildings.find(building => building.building_id === selectedCourse.building_id)
        : undefined;

    function courseYearEnding(year: number): string {
        if (year === 1) {
            return 'st';
        } else if (year === 2) {
            return 'nd';
        } else if (year === 3) {
            return 'rd';
        } else {
            return 'th';
        }
    }

    return (
        <form action={doScheduleAction} >
            <div>
                {/* Select Course */}
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    <div className="mb-4">
                        <label htmlFor="course" className="mb-2 block text-sm font-medium">
                            Choose Course
                        </label>
                        <div className="relative">
                            <select
                                id="course_id"
                                name="course_id"
                                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                defaultValue=""
                                onChange={handleChange}
                            >
                                <option value="" disabled>
                                    Select a course
                                </option>
                                {courses.map((course) => (
                                    <option key={course.course_id} value={course.course_id}>
                                        {course.course_id} - {course.course_name}
                                    </option>
                                ))}
                            </select>
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                </div>
                {/* Building and Module Output */}
                <div className="grid grid-cols-2 grid-rows-1">
                    <div>
                        <p>Building: {selectedBuilding?.building_name}</p>
                        <p>Rooms:</p>
                        {buildingRoomsArray.map((room) => (
                            <p key={room.room_id}>
                                {room.room_name} - Capacity: {room.capacity}
                            </p>
                        ))}
                    </div>
                    <div>
                        <p></p>
                        <p>Modules:</p>
                        {courseModulesArray.map((module) => (
                            <p key={module.module_id}>
                                {module.module_name} - Enrolled Students: {module.enrolled_students} - {module.module_year}{courseYearEnding(module.module_year)} year
                            </p>
                        ))}
                    </div>
                </div>
                {/* Traversal Order */}
                <div className='gap'>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium font-bold">
                        Traversal Order
                    </label>
                    <div className='rounded-md bg-gray-50 p-4 md:p-3'>
                        <div className="radio block text-sm font-medium py-2">
                            <label className="flex items-center">
                                <input type="radio" name="traversalOrder" id="startToEnd" value="startToEnd" defaultChecked />
                                <span className="ml-2">Start to End</span>
                            </label>
                        </div>
                        <div className="radio block text-sm font-medium py-2">
                            <label className="flex items-center">
                                <input type="radio" name="traversalOrder" id="endToStart" value="endToStart" />
                                <span className="ml-2">End to Start</span>
                            </label>
                        </div>
                        <div className="radio block text-sm font-medium py-2">
                            <label className="flex items-center">
                                <input type="radio" name="traversalOrder" id="dayByDay" value="dayByDay" />
                                <span className="ml-2">Day by Day (Module 1 starts on monday, Modules 2 starts on tuesday, until friday and then back to monday)</span>
                            </label>
                        </div>
                        <div className="radio block text-sm font-medium py-2">
                            <label className="flex items-center">
                                <input type="radio" name="traversalOrder" id="random" value="random" />
                                <span className="ml-2">Random</span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* Module Order */}
                <div className='gap'>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium font-bold">
                        Module Order
                    </label>
                    <div className="rounded-md bg-gray-50 p-4 md:p-3">
                        <div className="radio block text-sm font-medium py-2">
                            <label className="flex items-center">
                                <input type="radio" name="moduleOrder" id="byPopularity" value="byPopularity" defaultChecked />
                                <span className="ml-2">By Popularity (Module with largest number of students scheduled first, descending to lowest number of students last)</span>
                            </label>
                        </div>

                        <div className="radio block text-sm font-medium py-2">
                            <label className="flex items-center">
                                <input type="radio" name="moduleOrder" id="byPriority" value="byPriority" onChange={(e) => setPriorityOrderRequired(e.target.checked)} />
                                <span className="ml-2">Custom Priority (drag to put modules in order)</span>
                            </label>
                        </div>


                        {priorityOrderRequired && reorderArray()}

                        <div className="radio block text-sm font-medium py-2">
                            <label className="flex items-center">
                                <input type="radio" name="moduleOrder" id="random" value="random" />
                                <span className="ml-2">Random</span>
                            </label>
                        </div>
                    </div>
                </div>
                {/* Class Order */}
                <div className='gap'>
                    <div className="radio block text-sm font-medium py-2">
                        <label className="flex items-center">
                            <span className="ml-2">Class Order</span>
                        </label>
                    </div>
                    {reorderClasses()}
                </div>
                {/* Room Capacity Leeway */}
                <div className="gap">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Room Capacity Leeway - the percentage of students that need to fit in the room
                    </label>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        A leeway of 100% means the room must accommodate all students. A leeway of 50% means the room only needs to accommodate half of the students.
                    </label>
                    <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                        <div className="mb-2 block text-sm font-medium py-2">
                            <label htmlFor="name">
                                Lecture Room Capacity Leeway: {lecRoomLeeway}
                            </label>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="100" value={lecRoomLeeway} onChange={handleLecRoomLeewayChange} className="slider" id="lecRoomLeeway" name="lecRoomLeeway" />
                            </div>
                        </div>
                        <div className="mb-2 block text-sm font-medium py-2">
                            <label htmlFor="name">
                                Tutorial Room Capacity Leeway: {tutRoomLeeway}
                            </label>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="100" value={tutRoomLeeway} onChange={handleTutRoomLeewayChange} className="slider" id="tutRoomLeeway" name="tutRoomLeeway" />
                            </div>
                        </div>
                        <div className="mb-2 block text-sm font-medium py-2">
                            <label htmlFor="name">
                                Practical Room Capacity Leeway: {praRoomLeeway}
                            </label>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="100" value={praRoomLeeway} onChange={handlePraRoomLeewayChange} className="slider" id="praRoomLeeway" name="praRoomLeeway" />
                            </div>
                        </div>
                        <div className="mb-2 block text-sm font-medium py-2">
                            <label htmlFor="name">
                                Lab Room Capacity Leeway: {labRoomLeeway}
                            </label>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="100" value={labRoomLeeway} onChange={handleLabRoomLeewayChange} className="slider" id="labRoomLeeway" name="labRoomLeeway" />
                            </div>
                        </div>
                        <div className="mb-2 block text-sm font-medium py-2">
                            <label htmlFor="name">
                                Advisory Room Capacity Leeway: {advRoomLeeway}
                            </label>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="100" value={advRoomLeeway} onChange={handleAdvRoomLeewayChange} className="slider" id="advRoomLeeway" name="advRoomLeeway" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Student Availability Leeway */}
                <div className="gap">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Student Availablility Leeway - the percentage of students that need to have the slot free
                    </label>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        For example if 10% of students have a conflict at that timeslot. Set the leeway to 90% and the classwill be scheduled anyway.
                    </label>
                    <div className='rounded-md bg-gray-50 p-4 md:p-6'>
                        <div className="mb-2 block text-sm font-medium py-2">
                            <label htmlFor="name">
                                Lecture Student Availability Leeway: {lecStuLeeway}
                            </label>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="100" value={lecStuLeeway} onChange={handleLecStudentLeewayChange} className="slider" id="lecStuLeeway" name="lecStuLeeway" />
                            </div>
                        </div>
                        <div className="mb-2 block text-sm font-medium py-2">
                            <label htmlFor="name">
                                Tutorial Student Availability Leeway: {tutStuLeeway}
                            </label>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="100" value={tutStuLeeway} onChange={handleTutStudentLeewayChange} className="slider" id="tutStuLeeway" name="tutStuLeeway" />
                            </div>
                        </div>
                        <div className="mb-2 block text-sm font-medium py-2">
                            <label htmlFor="name">
                                Practical Student Availability Leeway: {praStuLeeway}
                            </label>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="100" value={praStuLeeway} onChange={handlePraStudentLeewayChange} className="slider" id="praStuLeeway" name="praStuLeeway" />
                            </div>
                        </div>
                        <div className="mb-2 block text-sm font-medium py-2">
                            <label htmlFor="name">
                                Lab Student Availability Leeway: {labStuLeeway}
                            </label>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="100" value={labStuLeeway} onChange={handleLabStudentLeewayChange} className="slider" id="labStuLeeway" name="labStuLeeway" />
                            </div>
                        </div>
                        <div className="mb-2 block text-sm font-medium py-2">
                            <label htmlFor="name">
                                Advisory Student Availability Leeway: {advStuLeeway}
                            </label>
                            <div className="slidecontainer">
                                <input type="range" min="0" max="100" value={advStuLeeway} onChange={handleAdvStudentLeewayChange} className="slider" id="advStuLeeway" name="advStuLeeway" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Class Daily Constraints */}
                <div className="gap">
                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                            Classes per day
                        </label>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                            Leave as 0 for default traversal
                        </label>
                    </div>
                    <div className='rounded-md bg-gray-50 p-4 md:p-3'>

                        <div className="grid grid-cols-2 text-sm rounded-md px-1 py-1">
                            <div>
                                <span className="ml-2">Max number of lectures per day</span>
                            </div>
                            <div>
                                <input type="number" defaultValue="0" name="lecClassesPerDay" id="lecClassesPerDay" className="text-sm peer block rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 text-sm rounded-md px-1 py-1">
                            <div>
                                <span className="ml-2">Max number of tutorials per day</span>
                            </div>
                            <div>
                                <input type="number" defaultValue="0" name="tutClassesPerDay" id="tutClassesPerDay" className="text-sm peer block rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 text-sm rounded-md px-1 py-1">
                            <div>
                                <span className="ml-2">Max number of practicals per day</span>
                            </div>
                            <div>
                                <input type="number" defaultValue="0" name="praClassesPerDay" id="praClassesPerDay" className="text-sm peer block rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 text-sm rounded-md px-1 py-1">
                            <div>
                                <span className="ml-2">Max number of labs per day</span>
                            </div>
                            <div>
                                <input type="number" defaultValue="0" name="labClassesPerDay" id="labClassesPerDay" className="text-sm peer block rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 text-sm rounded-md px-1 py-1">
                            <div>
                                <span className="ml-2">Max number of advisories per day</span>
                            </div>
                            <div>
                                <input type="number" defaultValue="0" name="advClassesPerDay" id="advClassesPerDay" className="text-sm peer block rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Substitute Lecturer */}
                <div className="gap relative rounded-md">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium font-bold">
                        Utilise Modules' Substitute Lecturer?
                    </label>
                    <input
                        id="useSubLecturer"
                        name="useSubLecturer"
                        type="checkbox"
                        className="relative rounded-md"
                    />
                </div>
                {/* Lecturer Options */}
                <div className='gap'>
                </div>

            </div>
            <Button type="submit" disabled={!selectedCourse} className={selectedCourse ? "bg-blue-600" : "bg-gray-300"}>{buttonText}</Button>
        </form >
    )
}