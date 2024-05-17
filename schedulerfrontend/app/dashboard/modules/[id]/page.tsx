// server-side
import { getModules, getUserByID } from "@/app/lib/data";
import { Modules } from "@/app/lib/definitions";
import LecturerModulesTable from "@/app/ui/modules/lecturer-modules";

export default async function Page({ params }: {params: { id: string } })  {

    const modules: Modules[] = await getModules();
    const user_id = params.id ? parseInt(params.id, 10) : null;
    const lecturer = await getUserByID(user_id as number);     

    return (
        <div className="w-full">
        <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl">Modules for {lecturer.firstname} {lecturer.lastname} | ID {user_id}</h1>
        </div>
        <div>
            <LecturerModulesTable modules={modules} lecturer={lecturer} />
        </div>
    </div>
    )


} 

