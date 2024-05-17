import { getCourses } from '@/app/lib/data';
import { DeleteCourse, UpdateCourse } from './buttons';
import { Courses } from '@/app/lib/definitions';

export default function CoursesTable({courses}: {courses: Courses[]}) {
    

    return (
        
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Course ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Course Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    School
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Qualification
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Years
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Building ID
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {courses?.map((course) => (
                                <tr
                                    key={course.course_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {course.course_id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {course.course_name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {course.school}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {course.qualification}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {course.years}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {course.building_id}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                        <UpdateCourse course_id={course.course_id} />
                                        <DeleteCourse course_id={course.course_id} />
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
