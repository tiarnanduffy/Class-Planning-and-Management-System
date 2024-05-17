import { lusitana } from '@/app/ui/fonts';
import { Buildings, Courses, Modules, Rooms, Schedule, Users } from '../lib/definitions';
import { getBuildings, getCourses, getLecturerUsers, getModules, getRooms, getScheduleRow, getScheduleRows, getStudentUsers } from '../lib/data';
import CourseStats from '../ui/dashboard/course-stats';
import ScheduledStats from '../ui/dashboard/scheduled-stats';
import UserStats from '../ui/dashboard/user-stats';
import ScheduleHistory from '../ui/dashboard/schedule-history';
import BuildingStats from '../ui/dashboard/building-stats';

export default async function Page() {

  const courses: Courses[] = await getCourses();
  const modules: Modules[] = await getModules();
  const students: Users[] = await getStudentUsers();
  const lecturers: Users[] = await getLecturerUsers();
  const scheduleRows: Schedule[] = await getScheduleRows();
  const buildings: Buildings[] = await getBuildings();
  const rooms: Rooms[] = await getRooms();

  return (
    <main>
      <h1 className={`bahnschrift mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid grid-cols-4">
        <div className="pr-2 col-span-1">
          <div className="rounded-xl border border-b bg-gray-50 p-4">
            <div className="md:gap-4">
              <ScheduledStats courses={courses} />
            </div>
          </div>
        </div>
        <div className="pr-2 col-span-1">
          <div className="rounded-xl border border-b bg-gray-50 p-4">
            <div className="md:gap-4">
              <div>
                <ScheduleHistory scheduleRows={scheduleRows} courses={courses} />
              </div>
            </div>
          </div>
        </div>
        <div className="pr-2 col-span-1">
        <div className='grid grid-rows-2'>
            <div className="rounded-xl border border-b bg-gray-50 p-4">
              <div className="md:gap-4">
              <UserStats lecturers={lecturers} students={students} />  
              </div>
            </div>
            <div className="rounded-xl border border-b bg-gray-50 p-4">
              <div className="md:gap-4">
              <BuildingStats buildings={buildings} rooms={rooms} courses={courses}/>
              </div>
            </div>
          </div>
        </div>
        <div className="pr-2 col-span-1">
          <div className='grid grid-rows-2'>
            <div className="rounded-xl border border-b bg-gray-50 p-4">
              <div className="md:gap-4">
                <CourseStats courses={courses} modules={modules} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  );
} 