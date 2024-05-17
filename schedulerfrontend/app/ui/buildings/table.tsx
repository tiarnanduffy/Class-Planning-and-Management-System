'use client'

import { DeleteBuilding, UpdateBuilding } from './buttons';
import { Buildings } from '@/app/lib/definitions';

export default function BuildingsTable({buildings}: {buildings: Buildings[]}) {
    
    
    return (

        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Building ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Building Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    School
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {buildings.map((building) => (
                                <tr
                                    key={building.building_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {building.building_id}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {building.building_name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {building.school}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateBuilding building_id={building.building_id} />
                                            <DeleteBuilding building_id={building.building_id} />
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
