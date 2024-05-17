import { DeleteModule, UpdateModule } from './buttons';
import { Modules, Users } from '@/app/lib/definitions';

    export default async function LecturerModulesTable({ modules, lecturer }: { modules: Modules[] , lecturer: Users}) {
    
    const lecturer_modules = modules.filter((module) => module.user_id === lecturer.user_id)

    return (
        
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Course ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Module Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Module Code
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Year
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Enrolled Students
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {lecturer_modules?.map((module) => (
                                <tr
                                    key={module.module_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6">
                                        {module.course_id}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6">
                                        {module.module_name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-6">
                                        {module.module_code}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-6">
                                        {module.module_year}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6">
                                        {module.enrolled_students}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6">
                                        <div className="flex justify-end gap-3">
                                        <UpdateModule module_id={module.module_id} />
                                        <DeleteModule module_id={module.module_id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
