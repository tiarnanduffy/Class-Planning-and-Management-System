'use client'

import { useState } from 'react';
import { Rooms } from '@/app/lib/definitions';
import { Buildings } from '@/app/lib/definitions';
import { DeleteRoom, UpdateRoom } from './buttons';

// Displays table of rooms
export default function RoomsTable({ rooms, buildings }: { rooms: Rooms[], buildings: Buildings[] }) {
    const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const buildingId = parseInt(e.target.value, 10);
        setSelectedBuildingId(buildingId);
    };

    const filteredRooms = selectedBuildingId !== null ? rooms.filter(room => room.building_id === selectedBuildingId) : rooms;

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                Rooms
                <div className="mb-4">
                    <label htmlFor="building" className="mb-2 block text-sm font-medium">
                    </label>
                    <div className="relative">
                        <select
                            id="building_id"
                            name="building_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Select a building
                            </option>
                            {buildings.map((building) => (
                                <option key={building.building_id} value={building.building_id}>
                                    {building.building_id} - {building.building_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    Room ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Room Name
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Building ID
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Capacity
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Facility
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Timetable ID
                                </th>
                                <th scope="col" className="relative py-3 pl-6 pr-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredRooms.map((room) => (
                                <tr
                                    key={room.room_id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        {room.room_id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {room.room_name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {room.building_id}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {room.capacity}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {room.facility}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {room.timetable_id}
                                    </td>
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <div className="flex justify-end gap-3">
                                            <UpdateRoom room_id={room.room_id} />
                                            <DeleteRoom room_id={room.room_id} />
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
