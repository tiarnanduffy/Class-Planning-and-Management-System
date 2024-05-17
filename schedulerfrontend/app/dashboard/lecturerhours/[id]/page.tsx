// server-side
import LecturerHoursTable from '@/app/ui/lecturerhours/table'
import { Suspense } from 'react';
import { getTimetableByID, getUserByID } from '@/app/lib/data';

export default async function Page({ params }: {params: { id: string } }) {

    const user_id = params.id ? parseInt(params.id, 10) : null;
    const lecturer = await getUserByID(user_id as number); 
    const timetable_id = lecturer.timetable_id;
    const timetable = await getTimetableByID(timetable_id)

    return (
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`bahnschrift text-2xl`}>Reserve Slots</h1>
      </div>
      <Suspense>
        <LecturerHoursTable timetable={timetable} lecturer={lecturer}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
      </div>
    </div>
    )
  }
