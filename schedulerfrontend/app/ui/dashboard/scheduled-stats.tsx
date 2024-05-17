'use client'

import React, { useEffect, useState } from 'react';
import PieChartComponent from './pie-chart-component';
import { Courses } from '@/app/lib/definitions';
export default function ScheduledStats({ courses }: { courses: Courses[] }) {

    const [courseStats, setCourseStats] = useState({ scheduledCount: 0, failedCount: 0 });

    useEffect(() => {
        calculateCourseStats();
    }, [courses]);

    // Get number of scheduled and unscheduled courses
    const calculateCourseStats = () => {
        const scheduledCount = courses.filter((course) => course.scheduled).length;
        const failedCount = courses.length - scheduledCount;
        setCourseStats({ scheduledCount, failedCount });
    };

    // Set up name and values to be passed in to PieChartComponent
    const pieChartDataScheduled = [
        { name: 'Scheduled Courses', value: courseStats.scheduledCount },
        { name: 'Unscheduled Courses', value: courseStats.failedCount },
    ];

    return (
        <div>
            <div className="col-span-1">
                <div className="rounded-xl bg-gray-50 p-4">
                    <div className="md:gap-4">
                        <div>
                            <h1 className="bahnschrift mb-4 text-xl md:text-xl">Scheduled Courses</h1>
                            <div className="flex flex-col items-start">
                                <div className='pl-8'>
                                    <h2 className="mt-4 text-blue-500 text-underlined">

                                        Scheduled
                                        {' - '}
                                        {courseStats.scheduledCount}

                                    </h2>
                                </div>
                                <div className='pl-8'>
                                    {courses.map((course) => (course.scheduled ? (
                                        <div key={course.course_id} className="">
                                            {course.course_name}
                                        </div>
                                    ) : null))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='pl-8'>
                                <h2 className="mt-4 text-gray-500 text-underlined">

                                    Unscheduled
                                    {' - '}
                                    {courseStats.failedCount}

                                </h2>
                            </div>
                            <div className='pl-8'>
                                {courses.map((course) => (!course.scheduled ? (
                                    <div key={course.course_id} className="">
                                        {course.course_name}
                                    </div>
                                ) : null))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 ml-4 mx-auto">
                        <PieChartComponent data={pieChartDataScheduled} width={200} height={200} />
                    </div>
                </div>
            </div>
        </div>
    );
}
