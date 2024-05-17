// server-side
import { getBuildings, getCourses, getModules, getRooms, getTimetables, getStudentUsers, getLecturerUsers } from '@/app/lib/data';
import { Buildings, Courses, Modules, Rooms, Timetables, Users } from '@/app/lib/definitions';
import { CreateTimetable, ResetTimetable } from "@/app/ui/timetables/buttons";
import MainTimetable from '@/app/ui/timetables/main-timetable';
import { revalidatePath } from 'next/cache';

export default async function Page() {

    const modules: Modules[] = await getModules();
    const rooms: Rooms[] = await getRooms();
    const buildings: Buildings[] = await getBuildings();
    const courses: Courses[] = await getCourses();
    const timetables: Timetables[] = await getTimetables();
    const studentusers: Users[] = await getStudentUsers();
    const lecturerusers: Users[] = await getLecturerUsers();

    revalidatePath('/dashboard/timetables')

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`bahnschrift text-2xl`}>Timetables</h1>
            </div>
            <div>
                <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
                    <CreateTimetable />
                    <div className='mx-0.5'></div>
                    <ResetTimetable />
                </div>
            </div>
            <div className="mt-5 flex w-full justify-center">
                <MainTimetable modules={modules} students={studentusers} rooms={rooms} lecturers={lecturerusers} buildings={buildings} courses={courses} timetables={timetables} />
            </div>
        </div>

    )
}