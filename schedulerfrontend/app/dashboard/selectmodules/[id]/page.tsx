// server-side
import {  getModules, getModulesByStudentUserID, getUserByID } from '@/app/lib/data';
import { Modules, } from '@/app/lib/definitions';
import ModuleList from '@/app/ui/selectmodules/module-list';

export default async function Page({ params }: {params: { id: string } }) {

    const modules: Modules[] = await getModules();

    const user_id = params.id ? parseInt(params.id, 10) : null;
    const student = await getUserByID(user_id as number);     
    const selected_modules = await getModulesByStudentUserID(user_id as number);

    return (
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`bahnschrift text-2xl`}>Select Modules</h1>
            </div>
            <div>
                <ModuleList modules={modules} student={student} selected_modules={selected_modules}/>
            </div>
        </div>

    )
}