'use client';

import {
  UserGroupIcon,
  HomeIcon,
  CalendarDaysIcon,
  CalendarIcon,
  BookOpenIcon,
  DocumentPlusIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  AcademicCapIcon,
  DocumentIcon,
  RectangleGroupIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


  export default function NavLinks({userType, userId}: {userType: string, userId: string}) {

    // Initialise empty array to be set as specific links
  let new_links: any[] = [];

  // Sets new_links depending on userType
  const setLinks = () => {
    if (userType == 'lecturer') {
      new_links = lecturer_links;
    } else if (userType == 'student') {
      new_links = student_links;
    } else {
      new_links = links;
    }
  }

  // Admin Links
  const links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon, },
    { name: 'Schedule', href: '/dashboard/timetables/create', icon: PlayIcon },
    { name: 'Timetables', href: '/dashboard/timetables', icon: CalendarIcon },
    { name: 'Courses', href: '/dashboard/courses', icon: ScaleIcon },
    { name: 'Modules', href: '/dashboard/modules', icon: DocumentIcon },
    { name: 'Buildings', href: '/dashboard/buildings', icon: BuildingOfficeIcon },
    { name: 'Rooms', href: '/dashboard/rooms', icon: RectangleGroupIcon },
    { name: 'Students', href: '/dashboard/studentusers', icon: AcademicCapIcon },       
    { name: 'Lecturers', href: '/dashboard/lecturerusers', icon: UserGroupIcon }      
  ];

  // Lecturer Links
  const lecturer_links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Reserve Slots', href: '/dashboard/lecturerhours/'+userId, icon: CalendarDaysIcon },
    { name: 'Timetable', href: '/dashboard/timetables/'+userId, icon: CalendarIcon },
    { name: 'Modules', href: '/dashboard/modules/'+userId, icon: BookOpenIcon }
  ]

  // Student Links
  const student_links = [
    { name: 'Home', href: '/dashboard', icon: HomeIcon },
    { name: 'Select Modules', href: '/dashboard/selectmodules/'+userId, icon: DocumentPlusIcon },
    { name: 'Timetable', href: '/dashboard/timetables/'+userId, icon: CalendarIcon }
  ]

  const pathname = usePathname();
  setLinks();
  return (
    <>
      {new_links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block bahnschrift">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
