// server-side
import RoomsTable from '@/app/ui/rooms/table'
import { revalidatePath } from 'next/cache';
import { CreateRoom } from '@/app/ui/rooms/buttons';
import { Suspense } from 'react';
import { getBuildings, getRooms } from '@/app/lib/data';

export default async function Page() {

  const rooms = await getRooms();
  const buildings = await getBuildings();
  
    revalidatePath('/dashboard/rooms');
    return (
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`bahnschrift text-2xl`}>Rooms</h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
        <CreateRoom />
      </div>
      <Suspense>
        <RoomsTable rooms={rooms} buildings={buildings}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
      </div>
    </div>
    )
  }