'use client'

import { CheckCircleIcon } from "@heroicons/react/20/solid"

// Success icon which displays after schedule attempt before proper timetable outcomes page is shown
export default function Success() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto" />
                <h1 className="text-lg text-lime-700">Success</h1>
            </div>
        </div>
    );
}