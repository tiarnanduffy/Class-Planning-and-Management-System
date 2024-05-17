'use client'

import { ArrowRightOnRectangleIcon, CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { Courses, Users } from "../lib/definitions";
import { useState } from "react";
import Link from "next/link";

// This class displays all lecturers that can be selected after lecturer is selected as the usertype in /home/
// User selects a lecturer with the button, the handleClickLecturer function sets the local storage to the userID and "lecturer" usertype
// The "OK" button is selected to go back to home page
// Where user can then select "Lecturer Dashboard" to access their dashboard and side-nav
export default function UserTable({ lecturers }: { lecturers: Users[] }) {

    const [selectedLecturerId, setSelectedLecturerId] = useState<number | null>(null);
    const btnClass = `flex items-center mx-auto justify-center rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base bahnschrift`;

    const handleClickLecturer = (user_id: number) => {
        localStorage.clear();
        setSelectedLecturerId(user_id);
        localStorage.setItem('user_type', 'lecturer');
        localStorage.setItem('user_id', user_id.toString());
    };

    return (
        <div className="mt-6 flow-root">
            <h2>Select a lecturer to be used for demo</h2>
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0  ">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    User ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Lecturer Firstname
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Lecturer Lastname
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Select</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {lecturers?.map((lecturer) => (
                                <tr
                                    key={lecturer.user_id}
                                    className={`w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg ${selectedLecturerId === lecturer.user_id ? 'bg-lime-100' : ''}`}
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {lecturer.user_id}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {lecturer.firstname}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {lecturer.lastname}
                                    </td>
                                    <td>
                                        <button onClick={() => handleClickLecturer(lecturer.user_id)} className="rounded-md border p-2 hover:bg-gray-100">
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