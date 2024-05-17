import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import Image from 'next/image';

// Note that login was not implemented and redirects to "/home" as does the home button

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col p-6">
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">

                <h1 className={`text-4xl text-white bahnschrift`}>
                    Class Planning and Management System
                </h1>

            </div>
            <div className=" flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                    <div className={styles.shape}></div>
                    <p className={`bahnschrift`}>
                        <strong>Welcome!</strong> Please login to access your personalised dashboard.
                    </p>
                    <p className={`bahnschrift`}>
                        <strong>Administrators</strong> can benefit from an intuitive system for scheduling timetables and effortlessly reviewing their outcomes, along with receiving suggestions for improvements,
                        while being able to carry out their usual administrative tasks of managing the University's data.
                    </p>
                    <p className={`bahnschrift`}>
                        <strong>Lecturers</strong> avail of their essential functions, viewing their timetables and modules, while selecting the hours that they are available, to ensure no modules are scheduled at that time
                    </p>
                    <p className={`bahnschrift`}>
                        <strong>Students</strong> can select their modules for the upcoming academic year and seamlessly access their timetable for these modules.
                    </p>
                    
                    <Link
                        href="/home"
                        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                    <Link
                        href="/home"
                        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Home</span> <ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                </div>
                <div className="flex items-center justify-center md:w-3/5 md:px-20 md:pt-30">
                    {/* Add Hero Images Here */}
                    <Image
                        src="/intro-image.png"
                        width={1412}
                        height={934}
                        className="hidden md:block pt-20"
                        alt="Screenshots of the dashboard project showing desktop version"
                    />
                </div>
            </div>
        </main>
    );
}
