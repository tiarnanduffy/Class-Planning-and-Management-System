'use client';

import { Buildings } from '@/app/lib/definitions';
import { createBuildingAction } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { useState } from 'react';

export default function Form({ buildings }: { buildings: Buildings[]; }) {

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate inputs test
        const formData = new FormData(e.currentTarget);
        const formEntries = Array.from(formData.entries());

        const newErrors: { [key: string]: string } = {};

        formEntries.forEach(([name, value]) => {
            if (name === 'building_name' && !value) {
                newErrors[name] = 'Building name is required';
            }

            if (name === 'school' && value === '') {
                newErrors[name] = 'School is required';
            }

        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // If no errors, submit the form
        createBuildingAction(formData);
    };

    return (

        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                {/* Enter Building Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter Building Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="building_name"
                                name="building_name"
                                placeholder="Building Name"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.building_name ? '' : 'invisible'}`}>{errors.building_name}</p>
                        </div>
                    </div>
                </div>

                {/* Enter School Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Enter School Name
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <div className="relative">
                            <input
                                id="school"
                                name="school"
                                placeholder="School"
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <p className={`text-red-500 text-xs ${errors.school ? '' : 'invisible'}`}>{errors.school}</p>
                        </div>
                    </div>
                </div>

                <Button type="submit">Create Building</Button>
            </div>
        </form>
    )
}