'use client'

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Users } from '@/app/lib/definitions';

export default function SideNav({ students, lecturers }: { students: Users[], lecturers: Users[] }) {

  const [userType, setUserType] = useState('admin');
  const [userId, setUserId] = useState('unset');
  const [userName, setUserName] = useState('');
  const [userTypeC, setUserTypeC] = useState('Admin');

  useEffect(() => {
    let u: string = "unset";
    if (localStorage.getItem("user_type") != null) {
      u = String(localStorage.getItem("user_type"));
    }

    let u_id: string = "unset";
    u_id = String(localStorage.getItem('user_id'));

    setUserType(u);
    setUserId(u_id);

    // Update userName if userType is student or lecturer to be displayed in top left of box dashboard
    if (u === 'student') {
      const student = students.find(student => student.user_id === parseInt(u_id));
      if (student) {
        setUserName(`${student.firstname} ${student.lastname}`);
        setUserTypeC("Student:");
      }
    } else if (u === 'lecturer') {
      const lecturer = lecturers.find(lecturer => lecturer.user_id === parseInt(u_id));
      if (lecturer) {
        setUserName(`${lecturer.firstname} ${lecturer.lastname}`);
        setUserTypeC("Lecturer:");
      }
    }

  }, [students, lecturers]);

  function resetStorage() {
    localStorage.clear();
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <h2></h2>
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <h1 className='text-white bahnschrift font-bold mb-4'>Class Planning and Management System</h1>
          <div className="mt-auto">
            <h2 className='text-white bahnschrift'>{userTypeC}</h2>
            <h2 className='text-white bahnschrift'>{userName}</h2>
          </div>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks userType={userType} userId={userId} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action="http://localhost:3000/home/">
          <button onClick={resetStorage} className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="bahnschrift hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
