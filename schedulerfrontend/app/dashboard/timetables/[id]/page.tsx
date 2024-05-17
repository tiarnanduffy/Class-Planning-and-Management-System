// server-side
import { Suspense } from 'react';
import { getUserByID, getTimetableByID } from '@/app/lib/data';
import IDTimetable from '@/app/ui/timetables/user-timetable';

export default async function Page({ params }: {params: { id: string } }) {

    
    const user_id = params.id ? parseInt(params.id, 10) : null;
    const user = await getUserByID(user_id as number);
    const timetable_id = user.timetable_id;
    const timetable = await getTimetableByID(timetable_id);

    return (
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`bahnschrift text-2xl`}>My Timetable</h1>
      </div>
      <Suspense>
        <IDTimetable timetable={timetable} user={user}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
      </div>
    </div>
    )
  }
