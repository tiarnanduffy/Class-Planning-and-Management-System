// server-side
import ModulesTable from "@/app/ui/modules/table";
import { revalidatePath } from "next/cache";
import { CreateModule, } from "@/app/ui/modules/buttons";
import { Suspense } from 'react';
import { getClasstypes, getCourses, getModules } from "@/app/lib/data";
import { Classtypes, Courses, Modules } from "@/app/lib/definitions";

export default async function Page() {
  
  const modules: Modules[] = await getModules();
  const classtypes: Classtypes[] = await getClasstypes();
  const courses: Courses[] = await getCourses();
  

  revalidatePath('/dashboard/modules');
  return (
    <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <h1 className={`bahnschrift text-2xl`}>Modules</h1>
    </div>
    <div className="mt-4 flex items-center justify-end gap-2 md:mt-8">
      <CreateModule />
    </div>
    <Suspense>
      <ModulesTable modules={modules} classtypes={classtypes} courses={courses}/>
    </Suspense>
    <div className="mt-5 flex w-full justify-center">
    </div>
  </div>
  )
}