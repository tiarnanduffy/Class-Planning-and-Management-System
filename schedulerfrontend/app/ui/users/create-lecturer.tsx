'use client';

import { createLecturerUserAction } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { bahnschrift } from '../fonts';
import { useState } from 'react';

export default function Form() {
  
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
        createLecturerUserAction(formData);
    };

    return (

        <form onSubmit={handleSubmit}>
            <div className={`rounded-md bg-gray-50 p-4 md:p-6 ${bahnschrift}`}>
                {/* Enter Student First Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter Lecturer Firstname
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="firstname"
                                name="firstname"
                                placeholder="Lecturer Firstname"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.firstname ? '' : 'invisible'}`}>{errors.firstname}</p>
                        </div>
                    </div>
                </div>

                {/* Enter Student Last Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter Lecturer Lastname
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="lastname"
                                name="lastname"
                                placeholder="Lecturer Lastname"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.lastname ? '' : 'invisible'}`}>{errors.lastname}</p>
                        </div>
                    </div>
                </div>

                {/* Enter Staff Number */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter Staff Number
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="ss_number"
                                name="ss_number"
                                placeholder="Staff Number"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.ss_number ? '' : 'invisible'}`}>{errors.ss_number}</p>
                        </div>
                    </div>
                </div>


                <Button type="submit">Create Lecturer</Button>
            </div>
        </form>
    )
}