'use client'

import { Modules } from "@/app/lib/definitions";
import React from "react";

interface ModuleClickHandlerProps {
    module: Modules;
    onModuleClick: (module: Modules) => void;
}

export default function ModuleClickHandler({ module, onModuleClick }: ModuleClickHandlerProps) {
    const handleClick = () => {
        onModuleClick(module);
    };

    return (
        <div>
            <table className="min-w-full">
                <tbody className="bg-white  h-8">
                    <tr
                        key={module.module_id} onClick={handleClick}
                        className="border border-black-100"
                    >
                        <td className="pl-6 text-xs bg-slate-50 hover:bg-slate-300">
                            <span style={{ fontWeight: 'bold' }}>{module.module_id} - {module.module_name}</span> (enrolled stu. = {module.enrolled_students}) Year {module.module_year}
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    )
}
