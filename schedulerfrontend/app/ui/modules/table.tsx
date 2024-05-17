'use client'

import { DeleteModule, UpdateModule } from './buttons';
import { Classtypes, Courses, Modules } from '@/app/lib/definitions';
import { useState } from 'react';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

// Displays table of modules and a function to hover over icon to view classes
export default function ModulesTable({ modules, classtypes, courses }: { modules: Modules[], classtypes: Classtypes[], courses: Courses[] }) {

    const [selectedClass, setSelectedClass] = useState<Classtypes>();
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const course_id = parseInt(e.target.value, 10);
        setSelectedCourseId(course_id);
    };

    const filteredModules = selectedCourseId !== null ? modules.filter(module => module.course_id === selectedCourseId) : modules;

    const handleMouseEnter = (module: Modules) => {
        setSelectedClass(classtypes.find(ct => ct.classtype_id === module.classtype_id));
    };

    const handleMouseLeave = () => {
        return (null)
    };

    return (

        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
            <div className="mb-4">
                    <label htmlFor="course" className="mb-2 block text-sm font-medium">
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
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Course ID
                                </th>
                                <th scope="col" className="px-4 py-5 font-medium">
                                    Module ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Module Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Module Code
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Year
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Lecturer ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Enrolled Students
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Sub Lecturer ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Classes
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredModules?.map((module) => (
                                <tr
                                    key={module.module_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {module.course_id}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {module.module_id}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {module.module_name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {module.module_code}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {module.module_year}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {module.user_id}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {module.enrolled_students}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {module.sub_lecturer_id}
                                    </td>

                                    {/* Hover over icon to see the number of classes per class type */}
                                    <td className="tooltip whitespace-nowrap py-3 pl-6 pr-3">
                                        <ClipboardDocumentIcon
                                            className='h-5 md:ml-4'
                                            onMouseEnter={() => handleMouseEnter(module)}
                                            onMouseLeave={() => handleMouseLeave}
                                        />
                                        <span className="tooltiptext">
                                            {selectedClass && (
                                                <>
                                                    <div>Lectures: {selectedClass.num_lectures}</div>
                                                    <div>Tutorials: {selectedClass.num_tutorials}</div>
                                                    <div>Practicals: {selectedClass.num_practicals}</div>
                                                    <div>Labs: {selectedClass.num_labs}</div>
                                                    <div>Advisories: {selectedClass.num_advisories}</div>
                                                </>
                                            )}
                                        </span>
                                    </td>


                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateModule module_id={module.module_id} />
                                            <DeleteModule module_id={module.module_id} />
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
