'use client'

import { deleteUserAction } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';



export function CreateStudent() {
  return (
    <Link
      href="/dashboard/studentusers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Student</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function CreateLecturer() {
  return (
    <Link
      href="/dashboard/lecturerusers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Lecturer</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateStudent({ student_id }: { student_id: number }) {
  return (
    <Link
      href={`/dashboard/studentusers/${student_id}/edit`}
      className='rounded-md border p-2 hover:ng-gray-100'
    >
      <PencilIcon className="w-5" />
    </Link>
  )
}

export function UpdateLecturer({ lecturer_id }: { lecturer_id: number }) {
  return (
    <Link
      href={`/dashboard/lecturerusers/${lecturer_id}/edit`}
      className='rounded-md border p-2 hover:ng-gray-100'
    >
      <PencilIcon className="w-5" />
    </Link>
  )
}

export function DeleteUser({ user_id }: { user_id: number }) {
  const pathname = usePathname()

  const deleteUserWithId = deleteUserAction.bind(null, user_id, pathname);
  return (
    <form action={deleteUserWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );

}
