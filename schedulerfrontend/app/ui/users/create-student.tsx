'use client';

import { createStudentUserAction } from '@/app/lib/actions';
import { Courses } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { bahnschrift } from '../fonts';
import { useState } from 'react';

export default function Form({ courses }: { courses: Courses[]; }) {
  
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const newErrors: { [key: string]: string } = {};

        // Validate inputs
        if (!formData.get('firstname')) {
            newErrors['firstname'] = 'Firstname is required';
        }
        if (!formData.get('lastname')) {
            newErrors['lastname'] = 'Lastname is required';
        }
        if (!formData.get('course_id')) {
            newErrors['course_id'] = 'Course is required';
        }
        if (!formData.get('course_year')) {
            newErrors['course_year'] = 'Year is required';
        }
        if (!formData.get('ss_number')) {
            newErrors['ss_number'] = 'Student number is required';
        }

        // Set errors state
        setErrors(newErrors);

        // If there are errors, return without submitting
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        // Submit form if no errors
        createStudentUserAction(formData);
    };

    return (

        <form onSubmit={handleSubmit}>
            <div className={`rounded-md bg-gray-50 p-4 md:p-6 ${bahnschrift}`}>
                {/* Enter Student First Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter Student Firstname
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="firstname"
                                name="firstname"
                                placeholder="Student Firstname"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.firstname ? '' : 'invisible'}`}>{errors.firstname}</p>
                        </div>
                    </div>
                </div>

                {/* Enter Student Last Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter Student Lastname
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="lastname"
                                name="lastname"
                                placeholder="Student Lastname"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.lastname ? '' : 'invisible'}`}>{errors.lastname}</p>
                        </div>
                    </div>
                </div>

                {/* Select Course */}
                <div className="mb-4">
                    <label htmlFor="course" className="mb-2 block text-sm font-medium">
                        Choose Course
                    </label>
                    <div className="relative">
                        <select
                            id="course_id"
                            name="course_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a course
                            </option>
                            {courses.map((course) => (
                                    <option key={course.course_id} value={course.course_id}>
                                        {course.course_id} - {course.course_name}
                                    </option>
                            ))}
                        </select>
                        <p className={`text-red-500 text-xs ${errors.course_id ? '' : 'invisible'}`}>{errors.course_id}</p>
                    </div>
                </div>

                {/* Student Year */}
                <div className="mb-4">
                    <label htmlFor="course" className="mb-2 block text-sm font-medium">
                        Select the year that the student is in
                    </label>
                    <div className="relative">
                        <select
                            id="course_year"
                            name="course_year"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select year
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
                        <p className={`text-red-500 text-xs ${errors.course_year ? '' : 'invisible'}`}>{errors.course_year}</p>
                    </div>
                </div>

                {/* Enter Student Number */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter Student Number
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="ss_number"
                                name="ss_number"
                                placeholder="Student Number"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.ss_number ? '' : 'invisible'}`}>{errors.ss_number}</p>
                        </div>
                    </div>
                </div>


                <Button type="submit">Create Student</Button>
            </div>
        </form>
    )
}