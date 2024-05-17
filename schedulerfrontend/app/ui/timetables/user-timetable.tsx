'use client'

import { Timetables } from "@/app/lib/definitions";
import { Users } from '@/app/lib/definitions';

// Timetable for Lecturers and Students when they view their personal timetable on their dashboard
export default async function IDTimetable({ timetable, user }: { timetable: Timetables, user: Users }) {
    const timesText = ["9-10", "10-11", "11-12", "12-13", "13-14", "14-15", "15-16", "16-17"];
    const moduleListArray: string[] = [];
    const labels: string[] = [];

    for (const [key, value] of Object.entries(timetable)) {
        if (key === "timetable_id") continue;
        moduleListArray.push(value.toString());
        labels.push(key);
    }

    return (
        <div className="mb-4">
            {user.user_id} | {user.firstname} {user.lastname}
            <div>

                <div className="gap grid grid-cols-5 grid-rows-1 border border-solid  border-black flex justify-center text-center items-center text-xs">
                    <b className="bg-amber-100">Lecture</b>
                    <b className="bg-lime-100">Tutorial</b>
                    <b className="bg-pink-200">Practical</b>
                    <b className="bg-purple-200">Lab</b>
                    <b className="bg-teal-200">Advisory</b>
                </div>

                <div className="grid grid-cols-6 grid-rows-1 text-center flex justify-center items-center">
                    <div></div>
                    <div>Monday</div>
                    <div>Tuesday</div>
                    <div>Wednesday</div>
                    <div>Thursday</div>
                    <div>Friday</div>
                </div>
                <div className="grid grid-cols-6 grid-rows-8 bg-slate-300">
                    {Array.from({ length: 8 }).map((_, rowIndex) => (
                        <>
                            <div className="bg-blue-300 m-2 text-l center div.container4 flex justify-center items-center" key={timesText[rowIndex]}>
                                <p>{timesText[rowIndex]}</p>
                            </div>
                            {
                                Array.from({ length: 5 }).map(
                                    (_, colIndex) => {
                                        const i = colIndex * 8 + rowIndex;
                                        let backgroundColor;

                                        let keySplits = moduleListArray[i].split("§")
                                        let moduleNameSplit = keySplits[0];
                                        let classKeySplit = keySplits[1];

                                        if (moduleListArray[i] === 'available') {
                                            backgroundColor = 'bg-white';
                                        } else if (moduleListArray[i] === 'reserved') {
                                            backgroundColor = 'bg-red-100';
                                        } else if (classKeySplit === 'lec') {
                                            backgroundColor = 'bg-amber-100';
                                        } else if (classKeySplit === 'tut') {
                                            backgroundColor = 'bg-lime-100';
                                        } else if (classKeySplit === 'pra') {
                                            backgroundColor = 'bg-pink-200';
                                        } else if (classKeySplit === 'lab') {
                                            backgroundColor = 'bg-purple-200';
                                        } else if (classKeySplit === 'adv') {
                                            backgroundColor = 'bg-teal-200';
                                        } else {
                                            backgroundColor = 'bg-white';
                                        }
                                        return (
                                            <div
                                                key={timetable.timetable_id + "_" + labels[i]}
                                                id={timetable.timetable_id + "_" + labels[i]}
                                                className={`m-2 text-xs center h-20 ${backgroundColor} flex justify-center items-center capitalise`}>
                                                {moduleNameSplit}
                                            </div>
                                        );
                                    }
                                )
                            }
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}