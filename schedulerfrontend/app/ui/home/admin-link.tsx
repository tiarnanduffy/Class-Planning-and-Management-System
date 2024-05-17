'use client'

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { bahnschrift } from "../fonts";

export default async function AdminLink() {

    const handleClick = () => {
    localStorage.clear();
          localStorage.setItem('user_type', 'admin');
    }

    return (
          <Link
            onClick={() => handleClick()}
            href="/dashboard"
            className={`flex items-center w-1/12 mx-auto justify-center rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base ${bahnschrift}`}
          >
            <span>Admin</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
    )

}