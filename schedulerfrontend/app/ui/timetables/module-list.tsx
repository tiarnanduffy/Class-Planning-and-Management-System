import { Modules } from "@/app/lib/definitions";
import { Buildings } from "@/app/lib/definitions";
import { Courses } from "@/app/lib/definitions";

// List of modules. Select one to view their timetable
export default function ModuleList({ modules, buildings, courses, handleClick }: { modules: Modules[], buildings: Buildings[], courses: Courses[], handleClick: Function }) {
    return (
        <div>
            <table className="min-w-full">
                <thead className="rounded-lg text-center text-sm font-normal">
                    <tr>
                        <th scope="col" className="bg-gray-200 px-4 py-8 font-medium sm:pl-6">
                            Select Module Timetable
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white overflow-y-auto h-8">
                    {modules?.map((m) => {

                        const trClass = "w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg";
                        const course = courses.find((c) => c.course_id === m.course_id);
                        const building_id = course?.building_id;
                        const building = buildings.find((b) => b.building_id === building_id);
                        const building_name = building ? building.building_name : "Unknown Building";
                        const course_name = course?.course_name;

                        return (
                            <tr
                                key={m.module_id} onClick={() => handleClick(m.timetable_id)}
                                className="h-20 border-y-2 border-black-100"
                            >
                                <td className="whitespace-nowrap pl-6 pr-3 text-xs hover:bg-slate-300">
                                    {m.module_id} - {m.module_name} - tt {m.timetable_id}
                                    <p className="font-bold">
                                        {course_name}
                                    </p>
                                    <p>
                                        Enrolled Students: {m.enrolled_students}
                                    </p>
                                    <p>
                                        Building: {building_name}
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





