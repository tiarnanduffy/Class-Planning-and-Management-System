'use client';

import { Buildings, Courses } from '@/app/lib/definitions';
import { getBuildings } from '@/app/lib/data'
import { createCourseAction } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { useState } from 'react';

export default function Form({ courses, buildings }: { courses: Courses[], buildings: Buildings[] }) {

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate inputs
        const formData = new FormData(e.currentTarget);
        const formEntries = Array.from(formData.entries());

        const newErrors: { [key: string]: string } = {};

        formEntries.forEach(([name, value]) => {
            if (name === 'course_name' && !value) {
                newErrors[name] = 'Course name is required';
            }

            if (name === 'school' && !value) {
                newErrors[name] = 'School is required';
            }

            if (name === 'qualification' && !value) {
                newErrors[name] = 'Qualification is required';
            }

            if (name === 'years' && isNaN(Number(value))) {
                newErrors[name] = 'Years must be a number';
            }

            if (name === 'years' && !value) {
                newErrors[name] = 'Years is required';
            }
            
            if (name === 'building_id' && value === '') {
                newErrors[name] = 'Building is required';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // If no errors, submit the form
            await createCourseAction(formData);
        } catch (error) {
            // Handle the error from createCourseAction
            console.error('Error creating course:', error);
            setErrors({ 'general': 'Failed to create course' });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Enter Course Name */}
                <div className="mb-4">
                    <label htmlFor="course_name" className="mb-2 block text-sm font-medium">
                        Enter Course Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="course_name"
                                name="course_name"
                                placeholder="Course Name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <p className={`text-red-500 text-xs ${errors.course_name ? '' : 'invisible'}`}>{errors.course_name}</p>
                        </div>
                    </div>
                </div>

                {/* Enter School Name */}
                <div className="mb-4">
                    <label htmlFor="school" className="mb-2 block text-sm font-medium">
                        Enter School Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="school"
                                name="school"
                                placeholder="School"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <p className={`text-red-500 text-xs ${errors.school ? '' : 'invisible'}`}>{errors.school}</p>
                        </div>
                    </div>
                </div>

                {/* Enter Qualification */}
                <div className="mb-4">
                    <label htmlFor="qualification" className="mb-2 block text-sm font-medium">
                        Enter Type Of Qualification
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="qualification"
                                name="qualification"
                                placeholder="Qualification"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                required
                            />
                            <p className={`text-red-500 text-xs ${errors.qualification ? '' : 'invisible'}`}>{errors.qualification}</p>
                        </div>
                    </div>
                </div>

                {/* Years */}
                <div className="mb-4">
                    <label htmlFor="years" className="mb-2 block text-sm font-medium">
                        Select Amount of Years for Course
                    </label>
                    <div className="relative">
                        <select
                            id="years"
                            name="years"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                            required
                        >
                            <option value="" disabled>
                                Select number of years
                            </option>
                            <option>
                                1
                            </option>
                            <option>
                                2
                            </option>
                            <option>
                                3
                            </option>
                            <option>
                                4
                            </option>
                        </select>
                        <p className={`text-red-500 text-xs ${errors.years ? '' : 'invisible'}`}>{errors.years}</p>
                    </div>
                </div>

                {/* Building */}
                <div className="mb-4">
                    <label htmlFor="building_id" className="mb-2 block text-sm font-medium">
                        Select Building
                    </label>
                    <div className="relative">
                        <select
                            id="building_id"
                            name="building_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
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

                <Button type="submit">Create Course</Button>
            </div>
        </form>
    )
}