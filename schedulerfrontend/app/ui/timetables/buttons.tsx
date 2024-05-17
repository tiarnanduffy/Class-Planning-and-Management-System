import { goBackToTimetablePage, resetTimetablesActions } from '@/app/lib/actions';
import { ArrowLeftOnRectangleIcon, ArrowPathIcon, CheckIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateTimetable() {
  return (
    <Link
      href="/dashboard/timetables/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Schedule Course</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function RescheduleTimetable() {
  return (
    <Link
      href="/dashboard/timetables/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Reschedule Course</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function ResetTimetable() {
  return (
    <form action={resetTimetablesActions}>
      <button className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <span className="hidden md:block">Reset Timetables</span>
        <ArrowPathIcon className="h-5 md:ml-4" />
      </button>
    </form>
  )
}

export function Apply({ onClick }: ApplyProps) {
  return (
    <button type="button" onClick={onClick} className="flex h-7 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      <span className="hidden md:block">Apply</span>
      <CheckIcon className="h-5 md:ml-4" />
    </button>
  )
}

interface ApplyProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>; // Define the type for the onClick prop
}


export function GoBackToTimetablePage() {
  return (
    <form action={goBackToTimetablePage}>
      <button className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <span className="hidden md:block">Go Back</span>
        <ArrowLeftOnRectangleIcon className="h-5 md:ml-4" />
      </button>
    </form>
  )
}
