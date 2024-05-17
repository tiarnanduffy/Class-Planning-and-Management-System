'use client'


import React, { useEffect, useState } from 'react';
import { Courses,  Modules, Users } from '@/app/lib/definitions';
export default function CourseStats({ courses, modules }: { courses: Courses[], modules: Modules[] }) {

    const [modulesPerCourse, setModulesPerCourse] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        calculateModulesPerCourse();
    }, [courses, modules]);

    // Function to calculate the number of modules per course
    const calculateModulesPerCourse = () => {
        const modulesCountMap: { [key: string]: number } = {};

        // Initialise module count for each course to 0
        courses.forEach(course => {
            modulesCountMap[course.course_id] = 0;
        });

        // Count the number of modules for each course
        modules.forEach(module => {
            modulesCountMap[module.course_id]++;
        });

        // Set the state with the calculated modules count
        setModulesPerCourse(modulesCountMap);
    };

    return (
        <div>
            <div className="col-span-1">
                <div className="rounded-xl bg-gray-50 p-4">
                    <div className="md:gap-4">
                        <div>
                            <h1 className="bahnschrift mb-4 text-xl md:text-xl">Courses</h1>
                            <div className="mt-4 flex flex-col items-start">
                                {courses.map((course) => (
                                    <div key={course.course_id} className="pt-4">
                                        <h2 className="mt-4 text-blue-500 text-underlined">
                                            {course.course_name}
                                        </h2>
                                        <p>Num Modules: {modulesPerCourse[course.course_id] || 0}</p>
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
