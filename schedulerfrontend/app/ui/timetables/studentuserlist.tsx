import { Users } from "@/app/lib/definitions";
import { Courses } from "@/app/lib/definitions";

// List of students. Select one to view their timetable. Shows name, id, course and course year.
export default function StudentList({ students, courses, handleClick }: { students: Users[], courses: Courses[], handleClick: Function }) {

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
        <div>
            <table className="min-w-full">
            <thead className="rounded-lg text-center text-sm font-normal bg-gr">
                    <tr>
                        <th scope="col" className="bg-gray-200 px-4 py-8 font-medium sm:pl-6">
                            Select Student Timetable
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white overflow-y-auto h-8">
                    {students?.map((s) => {
                        const course = courses.find((c) => c.course_id === s.course_id);
                        const courseName = course ? course.course_name : "Unknown Course";
                        return (
                            <tr
                                key={s.user_id} onClick={() => handleClick(s.timetable_id)}
                                className="h-20 border-y-2 border-black-100"
                            >
                                <td className="whitespace-nowrap pl-6 pr-3 text-xs bg-slate-50 hover:bg-slate-300">
                                    {s.user_id} - {s.ss_number} - tt {s.timetable_id}
                                    <p>{s.firstname} {s.lastname}</p>
                                    <p>
                                        Course: {courseName}
                                    </p>
                                    <p>
                                        {s.course_year}{courseYearEnding(s.course_year)} Year
                                    </p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    )
}