'use client'

import React, { useEffect, useState } from 'react';
import { Buildings, Courses, Rooms } from '@/app/lib/definitions';
export default function BuildingStats({ buildings, rooms, courses }: { buildings: Buildings[], rooms: Rooms[], courses: Courses[] }) {

    const [roomsPerBuilding, setRoomsPerBuilding] = useState<{ [key: string]: number }>({});
    const [coursesPerBuilding, setCoursesPerBuilding] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        calculateRoomsPerBuilding();
        calculateCoursesPerBuilding();
    }, [buildings, rooms, courses]);

    // Function to calculate the number of rooms per building
    const calculateRoomsPerBuilding = () => {
        const roomsCountMap: { [key: string]: number } = {};

        // Initialise rooms count for each building to 0
        buildings.forEach(building => {
            roomsCountMap[building.building_id] = 0;
        });

        // Count the number of rooms for each building
        rooms.forEach(room => {
            roomsCountMap[room.building_id]++;
        });

        // Set the state with the calculated rooms count
        setRoomsPerBuilding(roomsCountMap);
    };

    // Same logic as rooms per building
    const calculateCoursesPerBuilding = () => {
        const coursesCountMap: { [key: string]: number } = {};

        buildings.forEach(building => {
            coursesCountMap[building.building_id] = 0;
        });

        courses.forEach(course => {
            coursesCountMap[course.building_id]++;
        });

        setCoursesPerBuilding(coursesCountMap);
    }

    return (
        <div>
            <div className="col-span-1">
                <div className="rounded-xl bg-gray-50 p-4">
                    <div className="md:gap-4">
                        <div>
                            <h1 className="bahnschrift mb-4 text-xl md:text-xl">Buildings</h1>
                            <div className="mt-4 flex flex-col items-start">
                                {/* Render building names and corresponding rooms count */}
                                {buildings.map((building) => (
                                    <div key={building.building_id} className="pt-2">
                                        <h2 className="mt-4 text-blue-500 text-underlined">
                                            {building.building_name}
                                        </h2>
                                        <p>Rooms: {roomsPerBuilding[building.building_id] || 0}</p>
                                        <p>Courses using building: {coursesPerBuilding[building.building_id] || 0}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
