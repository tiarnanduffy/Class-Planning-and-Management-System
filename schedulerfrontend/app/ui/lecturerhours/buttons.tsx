import { CheckIcon, LockClosedIcon, } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { reserveSlotAction } from '@/app/lib/actions';

export async function ConfirmHours() {

    return (
        <div>
            <Link
                href="/dashboard/lecturerHours/confirm"
                className="gap flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                <span className="hidden md:block">Confirm Hours</span>{' '}
                <CheckIcon className="h-5 md:ml-4" />
            </Link>
        </div>
    );
}

export function ReserveSlot({ slot_id, user_id }: { slot_id: string, user_id: number }) {
    const reserveSlotWithSlotId = reserveSlotAction.bind(null, slot_id, user_id); 
    return (
      <form action={reserveSlotWithSlotId}>
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Reserve Slot</span>
          <LockClosedIcon className="w-4" />
        </button>
      </form>
    );
  }