'use client'

import { redirectToDashboard } from '@/app/lib/actions';
import { Users } from '@/app/lib/definitions';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

    export default function StudentsTable({students}: {students: Users[]}) {

    const handleClick = (user_id: number) => {
        localStorage.clear();
        localStorage.setItem('user_type', 'student');
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
                                    Student ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Firstname
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Lastname
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Course ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Year
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`bg-white`}>
                            {students?.map((student) => (
                                <tr
                                    key={student.user_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg hover:bg-slate-300"
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
                                    {student.course_id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                    {student.course_year}
                                    </td>
                                    <td>
                                    <button onClick={() => handleClick(student.user_id)} className="rounded-md border p-2 hover:bg-gray-100">
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
