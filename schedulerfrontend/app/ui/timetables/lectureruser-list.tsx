import {  Users } from "@/app/lib/definitions";

// List of lecturers. Select one to view their timetable
export default function LecturerList({ lecturers, handleClick }: { lecturers: Users[], handleClick: Function }) {
    return (
        <div>
            <table className="min-w-full">
                <thead className="rounded-lg text-center text-sm font-normal">
                    <tr>
                        <th scope="col" className="bg-gray-200 px-4 py-8 font-medium sm:pl-6">
                            Select Lecturer Timetable
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white overflow-y-auto h-8 ">
                    {lecturers?.map((l) => (
                        <tr
                            key={l.user_id} onClick={() => handleClick(l.timetable_id)}
                            className="h-20 border-y-2 border-black-100"
                        >
                            <td className="whitespace-nowrap pl-6 pr-3 text-xs bg-slate-50 hover:bg-slate-300">
                                {l.user_id} - {l.ss_number} - tt {l.timetable_id}
                                <p>
                                {l.firstname} {l.lastname}
                                </p>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}