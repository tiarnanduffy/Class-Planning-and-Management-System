// server-side
import StudentTable from '@/app/ui/users/student-table'
import { getCourses, getStudentUsers } from '@/app/lib/data';
import { revalidatePath } from 'next/cache';
import { Suspense } from 'react';
import { Courses, Users } from '@/app/lib/definitions';
import { CreateStudent } from '@/app/ui/users/buttons';

export default async function Page() {

  const students: Users[] = await getStudentUsers();
  const courses: Courses[] = await getCourses();

  revalidatePath('/dashboard/studentusers');
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`bahnschrift text-2xl`}>Students</h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
        <CreateStudent />
      </div>
      <Suspense>
        <StudentTable students={students} courses={courses}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
      </div>
    </div>
  )
}
