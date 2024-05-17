'use client'

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { redirectToDashboard } from '@/app/lib/actions';
import { Users } from '@/app/lib/definitions';
    
    export default function LecturersTable({lecturers}: {lecturers: Users[]}) {

    const handleClick = (user_id: number) => {
        localStorage.clear();
        localStorage.setItem('user_type', 'lecturer');
        localStorage.setItem('user_id', user_id.toString());
        redirectToDashboard();
    };

    // Table of Lecturers that use can select to access the system
    return (

        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0  overflow-y-auto h-96">
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
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Staff Number
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
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg "
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
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {lecturer.ss_number}
                                    </td>
                                    <td>
                                        <button onClick={() => handleClick(lecturer.user_id)} className="rounded-md border p-2 hover:bg-gray-100">
                                            <span className="sr-only">Select</span>
                                            <ArrowRightOnRectangleIcon className="w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
