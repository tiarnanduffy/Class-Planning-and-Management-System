'use client'

import { XMarkIcon } from "@heroicons/react/20/solid"

// Failure icon which displays after schedule attempt before proper timetable outcomes page is shown
export default function Failure() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <XMarkIcon className="w-24 h-24 text-red-700 mx-auto" />
                <h1 className="text-lg text-red-700">Failure</h1>
            </div>
        </div>
    );
}