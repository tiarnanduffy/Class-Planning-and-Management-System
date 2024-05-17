'use client'

import { ArrowRightOnRectangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Courses, Users } from "../lib/definitions";

import Link from "next/link";
import { useState } from "react";

// This class displays all students that can be selected after student is selected as the usertype in /home/
// User selects a student with the button, the handleClickLecturer function sets the local storage to the userID and "student" usertype
// The "OK" button is selected to go back to home page
// Where user can then select "Student Dashboard" to access their dashboard and side-nav

export default function StudentTable({ students, courses }: { students: Users[], courses: Courses[] }) {

    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const btnClass = `flex items-center mx-auto justify-center rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base bahnschrift`;

    const handleClickStudent = (user_id: number) => {
        localStorage.clear();
        setSelectedStudentId(user_id);
        localStorage.setItem('user_type', 'student');
        localStorage.setItem('user_id', user_id.toString());
    };

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
        <div className="mt-6 flow-root">
            <h2>Select a student to be used for demo</h2>
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    User ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Firstname
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Lastname
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Course
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Select</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`bg-white`}>
                            {students?.map((student) => (
                                <tr
                                    key={student.user_id}
                                    className={`w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg ${selectedStudentId === student.user_id ? 'bg-lime-100' : ''}`}
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {student.user_id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {student.firstname}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {student.lastname}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {courses.find(course => course.course_id === student.course_id)?.course_name || ''} - {student.course_year}{courseYearEnding(student.course_year)} year
                                    </td>
                                    <td>
                                        <button onClick={() => handleClickStudent(student.user_id)} className="rounded-md border p-2 hover:bg-gray-100">
                                            <span className="sr-only">Select</span>
                                            <CheckCircleIcon className="w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Link href="/home" className={btnClass} > <span className="flex items-center capitalise"> OK </span> </Link>
        </div>
    );

}