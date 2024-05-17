// server-side
import LecturerTable from '@/app/ui/users/lecturer-table'
import { getLecturerUsers } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';
import { Users } from '@/app/lib/definitions';
import { CreateLecturer } from '@/app/ui/users/buttons';

export default async function Page() {

    const lecturers: Users[] = await getLecturerUsers();

    revalidatePath('/dashboard/students');
    return (
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`bahnschrift text-2xl`}>Lecturers</h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
        <CreateLecturer />
      </div>
      <Suspense>
        <LecturerTable lecturers={lecturers}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
      </div>
    </div>
    )
  }
