'use client'

import { Courses, Schedule } from '@/app/lib/definitions';
export default function ScheduleHistory({ scheduleRows, courses }: { scheduleRows: Schedule[], courses: Courses[] }) {

    const findCourseName = (courseId: number): string => {
        const course = courses.find(course => course.course_id === courseId);
        return course ? course.course_name : 'Unknown';
    };

    return (
        <div>
            <div className="col-span-1">
                <div className="rounded-xl bg-gray-50 p-4">
                    <div className="md:gap-4">
                        <div>
                            <h1 className="bahnschrift mb-4 text-xl md:text-xl">Schedule History</h1>
                            <div className="flex flex-col items-start">
                                <h2 className="mt-4 text-blue-500 text-underlined">
                                    Most recent schedules:
                                </h2>
                                {scheduleRows.map((schedule) => (
                                    <div key={schedule.schedule_id} className="pt-8">
                                        <p>{findCourseName(schedule.course_id)} - Result: {schedule.status}</p>
                                        <p>{new Date(schedule.datetime).toLocaleString()}</p>                                      
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
