// server-side
import BuildingsTable from '@/app/ui/buildings/table'
import RoomsTable from '@/app/ui/rooms/table';
import { revalidatePath } from 'next/cache';
import { CreateBuilding } from '@/app/ui/buildings/buttons';
import { Suspense } from 'react';
import { getBuildings, getRooms } from '@/app/lib/data';
import { Buildings } from '@/app/lib/definitions';

export default async function Page() {
  revalidatePath('/dashboard/buildings');
  const buildings: Buildings[] = await getBuildings();
  const rooms = await getRooms();


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`bahnschrift text-2xl`}>Buildings</h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
        <CreateBuilding />
      </div>
      <Suspense>
        <BuildingsTable buildings={buildings}/>
      </Suspense>
      <Suspense>
        <RoomsTable rooms={rooms} buildings={buildings}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
      </div>
    </div>
  )
}
