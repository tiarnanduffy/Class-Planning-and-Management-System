'use client'

import { Users } from "@/app/lib/definitions";

export default function UsersTable({students, lecturers}: {students: Users[], lecturers: Users[]}) {


    return (
        
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                STUDENTS
                <div className={`rounded-lg bg-gray-50 p-2 md:pt-0`}>
                    
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
                                    Course ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Year
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Student Number
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`bg-white`}>
                            {students?.map((student) => (
                                <tr
                                    key={student.user_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
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
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {student.ss_number}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="inline-block min-w-full align-middle">
                LECTURERS
                <div className={`rounded-lg bg-gray-50 p-2 md:pt-0`}>
                    
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
                                    Course ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Year
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Staff Number
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`bg-white`}>
                            {lecturers?.map((lecturer) => (
                                <tr
                                    key={lecturer.user_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {lecturer.user_id}   
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                    {lecturer.firstname}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                    {lecturer.lastname}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                    {lecturer.course_id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                    {lecturer.course_year}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {lecturer.ss_number}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
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
