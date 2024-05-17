'use client'


import React from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Users } from '@/app/lib/definitions';
export default function UserStats({ lecturers, students }: { lecturers: Users[], students: Users[] }) {

    let numStudents: number = students.length;
    let numLecturers: number = lecturers.length;

    const data = [
        { name: 'Lecturers', value: numLecturers },
        { name: 'Students', value: numStudents },
    ];

    return (
        <div>
            {/* Column 1 */}
            <div className="col-span-1">
                <div className="rounded-xl bg-gray-50 p-4">
                    <div className="md:gap-4">
                        <h1 className="bahnschrift mb-4 text-xl md:text-xl">Student / Lecturer Stats</h1>
                        <div className="flex flex-col items-start">
                            <div className="mt-4 pl-16">
                                <h2 className="text-blue-500 text-underlined">
                                    Lecturers
                                </h2>
                            </div>
                            <div className="pl-6">
                                <p>Number of Lecturers:</p>
                                <p className="pl-16">{numLecturers}</p>
                            </div>
                        </div>
                        <div >
                            <div className="pl-16">
                                <h2 className="mt-4 text-blue-500 text-underlined">
                                    Students
                                </h2>
                            </div>
                            <div className="pl-6">
                                <p>Number of Students:</p>
                                <p className="pl-16">{numStudents}</p>
                            </div>
                        </div>
                        <div className="mt-10">
                            <BarChart width={200} height={200} data={data}>
                                <Bar dataKey="value" fill="#8884d8" />
                                <XAxis dataKey="name" />
                                <YAxis />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
