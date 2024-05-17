'use client'

import { createModuleAction } from '@/app/lib/actions';
import { Courses } from '@/app/lib/definitions';
import { Users } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import Collapsible from '../collapsible';

export default function Form({ courses, lecturers }: { courses: Courses[], lecturers: Users[]; }) {

    const [lectureFacilityRequired, setLectureFacilityRequired] = useState(false);
    const [tutorialFacilityRequired, setTutorialFacilityRequired] = useState(false);
    const [practicalFacilityRequired, setPracticalFacilityRequired] = useState(false);
    const [labFacilityRequired, setLabFacilityRequired] = useState(false);
    const [advisoryFacilityRequired, setAdvisoryFacilityRequired] = useState(false);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate inputs
        const formData = new FormData(e.currentTarget);
        const formEntries = Array.from(formData.entries());

        const newErrors: { [key: string]: string } = {};

        formEntries.forEach(([name, value]) => {
            if (name === 'course_id' && value === '') {
                newErrors[name] = 'Course is required';
            }

            if (name === 'module_name' && !value) {
                newErrors[name] = 'Module name is required';
            }

            if (name === 'module_code' && !value) {
                newErrors[name] = 'Module code is required';
            }

            if (name === 'module_year' && isNaN(Number(value))) {
                newErrors[name] = 'Module year must be a number';
            }

            if (name === 'module_year' && !value) {
                newErrors[name] = 'Module year is required';
            }

            if (name === 'lecturer_id' && value === '') {
                newErrors[name] = 'Lecturer is required';
            }


            if (name === 'sub_lecturer_id' && value === '') {
                newErrors[name] = 'Substitute Lecturer is required';
            }

            if (name === 'enrolled_students' && isNaN(Number(value))) {
                newErrors[name] = 'Enrolled Students must be a number';
            }
            
            if (name === 'enrolled_students' && isNaN(Number(value))) {
                newErrors[name] = 'Enrolled Students must be a number';
            }

            if(name === 'num_lectures' && isNaN(Number(value))) {
                newErrors[name] = 'Must be a number or blank';
            }

            if(name === 'num_tutorials' && isNaN(Number(value))) {
                newErrors[name] = 'Must be a number or blank';
            }

            if(name === 'num_practicals' && isNaN(Number(value))) {
                newErrors[name] = 'Must be a number or blank';
            }

            if(name === 'num_labs' && isNaN(Number(value))) {
                newErrors[name] = 'Must be a number or blank';
            }

            if(name === 'num_advisories' && isNaN(Number(value))) {
                newErrors[name] = 'Must be a number or blank';
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // If no errors, submit the form
            await createModuleAction(formData);
        } catch (error) {
            // Handle the error from createModuleAction
            console.error('Error creating module:', error);
            setErrors({ 'general': 'Failed to create module' });
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
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

                {/* Enter Module Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter Module Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="module_name"
                                name="module_name"
                                placeholder="Module Name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.module_name ? '' : 'invisible'}`}>{errors.module_name}</p>
                        </div>
                    </div>
                </div>

                {/* Enter Module Code */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter Module Code
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="module_code"
                                name="module_code"
                                placeholder="Module Code"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                             <p className={`text-red-500 text-xs ${errors.module_code ? '' : 'invisible'}`}>{errors.module_code}</p>
                        </div>
                    </div>
                </div>

                {/* Enter Module Year */}
                <div className="mb-4">
                    <label htmlFor="course" className="mb-2 block text-sm font-medium">
                        Select the year that the module is in
                    </label>
                    <div className="relative">
                        <select
                            id="module_year"
                            name="module_year"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select module year
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
                        <p className={`text-red-500 text-xs ${errors.module_year ? '' : 'invisible'}`}>{errors.module_year}</p>
                    </div>
                </div>

                {/* Enter Lecturer */}
                <div className="mb-4">
                    <label htmlFor="course" className="mb-2 block text-sm font-medium">
                        Select Lecturer
                    </label>
                    <div className="relative">
                        <select
                            id="lecturer_id"
                            name="lecturer_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select a lecturer
                            </option>
                            {lecturers.map((lecturer) => (
                                <option key={lecturer.user_id} value={lecturer.user_id}>
                                    {lecturer.user_id} - {lecturer.firstname} {lecturer.lastname}
                                </option>
                            ))}
                        </select>
                        <p className={`text-red-500 text-xs ${errors.lecturer_id ? '' : 'invisible'}`}>{errors.lecturer_id}</p>
                    </div>
                </div>

                {/* Enter enrolled_students */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Hardcode number of enrolled_students
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="enrolled_students"
                                name="enrolled_students"
                                placeholder="Number of Enrolled Students"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.enrolled_students ? '' : 'invisible'}`}>{errors.enrolled_students}</p>
                        </div>
                    </div>
                </div>

                {/* Select Substitute Lecturer */}
                <div className="mb-4">
                    <label htmlFor="course" className="mb-2 block text-sm font-medium">
                        Select Substitute Lecturer
                    </label>
                    <div className="relative">
                        <select
                            id="sub_lecturer_id"
                            name="sub_lecturer_id"
                            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select substitute lecturer
                            </option>
                            {lecturers.map((lecturer) => (
                                <option key={lecturer.user_id} value={lecturer.user_id}>
                                    {lecturer.user_id} - {lecturer.firstname} {lecturer.lastname}
                                </option>
                            ))}
                        </select>
                        <p className={`text-red-500 text-xs ${errors.sub_lecturer_id ? '' : 'invisible'}`}>{errors.sub_lecturer_id}</p>
                    </div>
                </div>

                <div>
                    <h2 className="mb-2 block text-sm font-medium">
                        The following options let you set the number of classes per week and facility required for the different class types.
                    </h2>
                </div>

                {/* Set Classes Section */}
                <div className="container mb-4 rounded-md px-1 py-1">
                    {/* Set Lecturers Section */}
                    <Collapsible title="Lectures">

                        <div className='grid grid-cols-3 bg-grey-50 p-1'>

                            <div className="relative mt-2 rounded-md">
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Number of lectures per week
                                </label>
                                <div className="relative">
                                    <input
                                        id="num_lectures"
                                        name="num_lectures"
                                        placeholder="Number of Lectures"
                                        className="peer block w-half rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <p className={`text-red-500 text-xs ${errors.num_lectures ? '' : 'invisible'}`}>{errors.num_lectures}</p>
                                </div>
                            </div>


                            <div className="relative rounded-md">
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Facility Required?
                                </label>
                                <input
                                    id="lecture_facility_required"
                                    name="lecture_facility_required"
                                    type="checkbox"
                                    className="relative rounded-md"
                                    onChange={(e) => setLectureFacilityRequired(e.target.checked)}
                                />
                            </div>

                            <div className={lectureFacilityRequired ? '' : 'invisible'}>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Facility
                                </label>
                                <input
                                    id="lecture_facility"
                                    name="lecture_facility"
                                    placeholder="Facility/Equipment"
                                    className="peer block w-half rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                                
                            </div>


                        </div>
                    </Collapsible>

                    {/* Set Tutorials Section */}
                    <Collapsible title="Tutorials">

                        <div className='grid grid-cols-3 bg-grey-50 p-1'>

                            <div className="relative mt-2 rounded-md">
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Number of tutorials per week
                                </label>
                                <div className="relative">
                                    <input
                                        id="num_tutorials"
                                        name="num_tutorials"
                                        placeholder="Number of Tutorials"
                                        className="peer block w-half rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <p className={`text-red-500 text-xs ${errors.num_tutorials ? '' : 'invisible'}`}>{errors.num_tutorials}</p>
                                </div>
                            </div>


                            <div className="relative rounded-md">
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Facility Required?
                                </label>
                                <input
                                    id="tutorial_facility_required"
                                    name="tutorial_facility_required"
                                    type="checkbox"
                                    className="relative rounded-md"
                                    onChange={(e) => setTutorialFacilityRequired(e.target.checked)}
                                />
                            </div>

                            <div className={tutorialFacilityRequired ? '' : 'invisible'}>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Facility
                                </label>
                                <input
                                    id="tutorial_facility"
                                    name="tutorial_facility"
                                    placeholder="Facility/Equipment"
                                    className="peer block w-half rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>


                        </div>
                    </Collapsible>

                    {/* Set Practicals Section */}
                    <Collapsible title="Practicals">
                        <div className='grid grid-cols-3 '>

                            <div className="relative mt-2 rounded-md">
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Number of practicals per week
                                </label>
                                <div className="relative">
                                    <input
                                        id="num_practicals"
                                        name="num_practicals"
                                        placeholder="Number of Practicals"
                                        className="peer block w-half rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <p className={`text-red-500 text-xs ${errors.num_practicals ? '' : 'invisible'}`}>{errors.num_practicals}</p>
                                </div>
                            </div>

                            <div className="relative mt-2 rounded-md">
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Facility Required?
                                </label>
                                <input
                                    id="practical_facility_required"
                                    name="practical_facility_required"
                                    type="checkbox"
                                    className="relative rounded-md"
                                    onChange={(e) => setPracticalFacilityRequired(e.target.checked)}
                                />
                            </div>

                            <div className={practicalFacilityRequired ? '' : 'invisible'}>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Facility
                                </label>
                                <input
                                    id="practical_facility"
                                    name="practical_facility"
                                    placeholder="Facility/Equipment"
                                    className="peer block w-half rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>



                        </div>
                    </Collapsible>

                    {/* Set Labs Section */}
                    <Collapsible title="Labs">
                        <div className='grid grid-cols-3'>

                            <div className="relative mt-2 rounded-md">
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Number of labs per week
                                </label>
                                <div className="relative">
                                    <input
                                        id="num_labs"
                                        name="num_labs"
                                        placeholder="Number of Labs"
                                        className="peer block w-half rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <p className={`text-red-500 text-xs ${errors.num_labs ? '' : 'invisible'}`}>{errors.num_labs}</p>
                                </div>
                            </div>


                            <div className="relative mt-2 rounded-md">
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Facility Required?
                                </label>
                                <input
                                    id="lab_facility_required"
                                    name="lab_facility_required"
                                    type="checkbox"
                                    className='rounded-md border'
                                    onChange={(e) => setLabFacilityRequired(e.target.checked)}
                                />
                            </div>

                            <div className={labFacilityRequired ? '' : 'invisible'}>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Facility
                                </label>
                                <input
                                    id="lab_facility"
                                    name="lab_facility"
                                    placeholder="Facility/Equipment"
                                    className="peer block w-half rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>


                        </div>
                    </Collapsible>

                    {/* Set Advisories Section */}
                    <Collapsible title="Advisories">
                        <div className='grid grid-cols-3'>

                            <div className="relative mt-2 rounded-md">
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Number of advisories per week
                                </label>
                                <div className="relative">
                                    <input
                                        id="num_advisories"
                                        name="num_advisories"
                                        placeholder="Number of Advisories"
                                        className="peer block w-half rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                    />
                                    <p className={`text-red-500 text-xs ${errors.num_advisories ? '' : 'invisible'}`}>{errors.num_advisories}</p>
                                </div>
                            </div>

                            <div className="relative mt-2 rounded-md">
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Facility Required?
                                </label>
                                <input
                                    id="advisory_facility_required"
                                    name="advisory_facility_required"
                                    type="checkbox"
                                    className='rounded-md'
                                    onChange={(e) => setAdvisoryFacilityRequired(e.target.checked)}
                                />
                            </div>

                            <div className={advisoryFacilityRequired ? '' : 'invisible'}>
                                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                                    Facility
                                </label>
                                <input
                                    id="advisory_facility"
                                    name="advisory_facility"
                                    placeholder="Facility/Equipment"
                                    className="peer block w-half rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                                />
                            </div>

                        </div>
                    </Collapsible>
                </div>

                <Button type="submit">Create Module</Button>
            </div>
        </form>
    )
}