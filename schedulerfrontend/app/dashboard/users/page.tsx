// server-side
import UsersTable from '@/app/ui/users/table'
import { getLecturerUsers } from '@/app/lib/data';
import { getStudentUsers } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';
import { bahnschrift } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { Users } from '@/app/lib/definitions';

export default async function Page() {

    const students: Users[] = await getStudentUsers();
    const lecturers: Users[] = await getLecturerUsers();

    revalidatePath('/dashboard/students');
    return (
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${bahnschrift} text-2xl`}>Students</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
      <Suspense>
        <UsersTable students={students} lecturers={lecturers}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
      </div>
    </div>
    )
  }
