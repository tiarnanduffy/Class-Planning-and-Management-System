// server-side
import CoursesTable from '@/app/ui/courses/table'
import { revalidatePath } from 'next/cache';
import { CreateCourse } from '@/app/ui/courses/buttons';
import { Suspense } from 'react';
import { getCourses } from '@/app/lib/data';
import { Courses } from '@/app/lib/definitions';

export default async function Page() {

  const courses: Courses[] = await getCourses();

    revalidatePath('/dashboard/courses');
    return (
      <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`bahnschrift text-2xl`}>Courses</h1>
      </div>
      <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
        <CreateCourse />
      </div>
      <Suspense>
        <CoursesTable courses={courses}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
      </div>
    </div>
    )
  }