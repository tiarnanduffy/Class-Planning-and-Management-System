'use client'

import { useState } from "react";
import { Buildings, Modules, Rooms, Courses, Timetables, Users } from "@/app/lib/definitions";
import ModuleList from "./module-list";
import StudentList from "./studentuserlist";
import RoomList from "./room-list";
import LecturerList from "./lectureruser-list";
import TimetableTable from "./table";

interface DTParameters {
    modules: Modules[];
    students: Users[];
    rooms: Rooms[];
    lecturers: Users[];
    buildings: Buildings[];
    courses: Courses[];
    timetables: Timetables[]
}

// Outputs components of the selectable timetables in columns of 4
// Then outputs the selected entity's timetable
export default function MainTimetable({ modules, students, rooms, lecturers, buildings, courses, timetables }: DTParameters) {

    let [TT, setTT] = useState(timetables[0]);

    function handleModuleClick(ttID: number) {
        timetables.forEach(s => {
            if (s.timetable_id == ttID) {
                setTT(s);
            }
        });
    }

    return (
        <div className="">
            <div className="grid grid-cols-4 grid-rows-1 overflow-auto h-96 border-x-2">

                <div className="">
                    <ModuleList modules={modules} buildings={buildings} courses={courses} handleClick={handleModuleClick} />
                </div>

                <div className="">
                    <StudentList students={students} courses={courses} handleClick={handleModuleClick} />
                </div>

                <div className="">
                    <RoomList rooms={rooms} buildings={buildings} handleClick={handleModuleClick} />
                </div>

                <div className="">
                    <LecturerList lecturers={lecturers} handleClick={handleModuleClick} />
                </div>

            </div>

            <div>
                
            </div>

            <div className="grid grid-8-cols grid-5-rows">
                <TimetableTable timetable={TT} />
            </div>
        </div>
    )
}

