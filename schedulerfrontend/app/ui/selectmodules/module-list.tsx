'use client'

import { selectModulesForUserAction } from '@/app/lib/actions';
import { Modules, Users } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';

export default function ModuleList({ modules, student, selected_modules }: { modules: Modules[], student: Users, selected_modules: number[] }) {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        const checkedRadioInputs = e.currentTarget.querySelectorAll<HTMLInputElement>('input[type="radio"]:checked');
        checkedRadioInputs.forEach((input: HTMLInputElement) => {
            formData.append('selectedModules', input.value);
        });
        selectModulesForUserAction(formData, student.user_id);
    };


    const course_modules = modules.filter((module) => module.course_id === student.course_id && student.course_year === module.module_year);

    return (
        <form onSubmit={handleSubmit} >

            <div className="inline-block min-w-full align-middle">
                <div className={`rounded-lg bg-gray-50 p-2 md:pt-0`}>

                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Module Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Code
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Select
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`bg-white`}>
                            {course_modules?.map((module) => (
                                <tr
                                    key={module.module_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {module.module_name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {module.module_code}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <input
                                            type='radio'
                                            value={module.module_id}
                                            disabled={(selected_modules).includes(module.module_id)}
                                            className="disabledButton"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Button type="submit">Submit Modules</Button>
        </form >
    )
}