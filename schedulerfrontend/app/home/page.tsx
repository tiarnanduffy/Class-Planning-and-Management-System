'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Home page

// When selecting a usertype, the text of the dashboard button changes to "(usertype) Dashboard" 

// Whens seleting the student or lecturer button
// Brought to selectstudent or selectlecturer page
// Select a user and press "OK"
// Then press "(usertype) Dashboard"

// Select Admin and press dashboard (don't have to select a user)
// NB: by default admin is the usertype selected, if a user student or lecturer is not selected on their page, usertype is defaulted back to admin
// Press "(usertype) Dashboard"

// localStorage has a usertype key and a userID key and is used through out the program
// to determine what pages they have access to

export default function Page() {

  const [btnDisabledState, setBtnDisabledState] = useState(true);
  const [userType, setUserType] = useState('unset');
  const [userTypeC, setUserTypeC] = useState('Admin');
  const [userId, setUserId] = useState("unset");

  const btnClass = `flex items-center mx-auto justify-center rounded-lg bg-blue-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base bahnschrift`;


  useEffect(() => { setBtnDisabledState(false);
    let uType = localStorage.getItem("user_type");
    if( uType ) setUserType( uType );
    if( uType === 'lecturer') {
      setUserTypeC("Lecturer");
    }
    if( uType === 'student') {
      setUserTypeC("Student");
    }
    let uId = localStorage.getItem("user_id");
    if( uId ) {
      setBtnDisabledState(false);
      setUserId( uId );
    }
 }, []);

  function handleClick(u: string) {
    localStorage.setItem("user_type", u)
    localStorage.setItem("user_id", "admin")
    setUserType(u);
    if( u === 'admin') {
      setUserTypeC("Admin");
    }
    setUserId('unset');
    setBtnDisabledState(false);
  }

  return (
    <main className="flex flex-col min-h-screen p-6">
      <div className="flex h-20 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <h1 className={`text-4xl text-white bahnschrift`}>
          Class Planning and Management System
        </h1>
      </div>
      <h2 className="bahnschrift">User Type: {userTypeC}</h2>
      <h2 className="bahnschrift">User ID: {userId}</h2>
      <div className="mt-4 flex-grow flex flex-col gap-4 bahnschrift">
        Select User Type:
        <div className="flex justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10">

          <Link href="/selectuser/selectstudent" className={btnClass} > <span className="flex items-center capitalise"> Select Student </span> </Link>
          <Link href="/selectuser/selectlecturer" className={btnClass} > <span className="flex items-center capitalise"> Select Lecturer </span> </Link>

          <input id="adminBtn" type="button" className="properbutton" value="Set to Admin" onClick={() => handleClick("admin")} />

        </div>

        <Link href="/dashboard" className={btnClass} >
          <span className={`flex items-center capitalise ${btnDisabledState}`}>
            {userTypeC} Dashboard <ArrowRightIcon className="w-5 md:w-6 pl-2" />
          </span>
        </Link>
      </div>
    </main>
  );
}

