import { deleteBuildingAction } from '@/app/lib/actions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateBuilding() {
  return (
    <Link
      href="/dashboard/buildings/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Building</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function createBuildingAction() {
  return (
    <Link
      href="/dashboard/buildings/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Building</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateBuilding({ building_id }: { building_id: number }) {
  return (
    <Link
      href={`/dashboard/buildings/${building_id}/edit`}
      className='rounded-md border p-2 hover:ng-gray-100'
    >
      <PencilIcon className="w-5" />
    </Link>
  )
}

export function DeleteBuilding({ building_id }: { building_id: number }) {
  const deleteBuildingWithId = deleteBuildingAction.bind(null, building_id);

  return (
    <form action={deleteBuildingWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}

export function AddRooms({ building_id }: { building_id: number }) {

  return (
    <Link
      href={`/dashboard/buildings/${building_id}/add-rooms`}
      className='rounded-md border p-2 hover:ng-gray-100'
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}