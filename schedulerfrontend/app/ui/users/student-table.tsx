'use client'

import { Courses, Users } from "@/app/lib/definitions";
import { DeleteUser, UpdateStudent } from "./buttons";
import { useState } from "react";

export default function StudentTable({students, courses}: {students: Users[], courses: Courses[]}) {

    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const courseId = parseInt(e.target.value, 10);
        setSelectedCourseId(courseId);
    };

    const filteredStudents = selectedCourseId !== null ? students.filter(student => student.course_id === selectedCourseId) : students;


    return (
        
        
        <div className="mt-6 flow-root">
            {/* Filter students by course */}
            <div className="inline-block min-w-full align-middle">
            <div className="mb-4">
                    <label htmlFor="building" className="mb-2 block text-sm font-medium">
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
                    </div>
                </div>



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
                            {filteredStudents?.map((student) => (
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
                                        <div className="flex justify-end gap-3">
                                        <UpdateStudent student_id={student.user_id} />
                                        <DeleteUser user_id={student.user_id} />
                                        </div>
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
