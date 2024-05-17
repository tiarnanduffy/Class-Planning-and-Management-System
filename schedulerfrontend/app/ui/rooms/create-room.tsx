'use client';

import { Buildings, Rooms } from '@/app/lib/definitions';
import { getBuildings } from '@/app/lib/data'
import { createRoomAction } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { useState } from 'react';

export default function Form({ rooms, buildings }: { rooms: Rooms[], buildings: Buildings[] }) {

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate inputs
        const formData = new FormData(e.currentTarget);
        const formEntries = Array.from(formData.entries());

        const newErrors: { [key: string]: string } = {};

        formEntries.forEach(([name, value]) => {
            if (name === 'room_name' && !value) {
                newErrors[name] = 'Room name is required';
            }

            if (name === 'building_id' && value === '') {
                newErrors[name] = 'Building is required';
            }

            if (name === 'capacity' && isNaN(Number(value))) {
                newErrors[name] = 'Capacity must be a number';
            }

            if (name === 'capacity' && !value) {
                newErrors[name] = 'Capacity is required';
            }

            if (name === 'facility' && facility && !value) {
                newErrors[name] = 'Facility is required';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // If no errors, submit the form
        createRoomAction(formData);
    };

    const [facility, setFacility] = useState(false);

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Enter Room Name */}
                <div className="mb-4">
                    <label htmlFor="room_name" className="mb-2 block text-sm font-medium">
                        Enter Room Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="room_name"
                                name="room_name"
                                placeholder="Room Name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <p className={`text-red-500 text-xs ${errors.room_name ? '' : 'invisible'}`}>{errors.room_name}</p>
                        </div>
                    </div>
                </div>

                {/* Select School */}
                <div className="mb-4">
                    <label htmlFor="building" className="mb-2 block text-sm font-medium">
                        Choose Building
                    </label>
                    <div className="relative">
                        <select
                            id="building_id"
                            name="building_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            required
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
                        <p className={`text-red-500 text-xs ${errors.building_id ? '' : 'invisible'}`}>{errors.building_id}</p>
                    </div>
                </div>


                {/* Enter Capacity */}
                <div className="mb-4">
                    <label htmlFor="capacity" className="mb-2 block text-sm font-medium">
                        Enter Capacity
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="capacity"
                                name="capacity"
                                placeholder="Capacity"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <p className={`text-red-500 text-xs ${errors.capacity ? '' : 'invisible'}`}>{errors.capacity}</p>
                        </div>
                    </div>
                </div>

                <div className="relative rounded-md">
                    <label htmlFor="facility_required" className="mb-2 block text-sm font-medium">
                        Facility Required?
                    </label>
                    <input
                        id="facility_required"
                        name="facility_required"
                        type="checkbox"
                        className="relative rounded-md"
                        onChange={(e) => setFacility(e.target.checked)}
                    />
                </div>

                {/* Facility */}
                <div className={`${facility ? '' : 'invisible'} mb-4`} >
                    <label htmlFor="facility" className="mb-2 block text-sm font-medium">
                        Enter Facility
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="facility"
                                name="facility"
                                placeholder="Facility"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.facility ? '' : 'invisible'}`}>{errors.facility}</p>
                        </div>
                    </div>
                </div>


                <Button type="submit">Create Room</Button>
            </div>
        </form>)
}