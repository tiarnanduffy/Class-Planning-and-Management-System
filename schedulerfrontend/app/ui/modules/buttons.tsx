import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteModuleAction } from '@/app/lib/actions';

export function CreateModule() {
  return (
    <Link
      href="/dashboard/modules/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Module</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function createModuleAction() {
    return (
      <Link
        href="/dashboard/modules/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Create Module</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  } 

export function UpdateModule({ module_id }: { module_id: number }) {
    return (
        <Link 
        href={`/dashboard/modules/${module_id}/edit`}
        className='rounded-md border p-2 hover:ng-gray-100'
        >
            <PencilIcon className="w-5"/>
        </Link>
    )
}

export function DeleteModule({ module_id }: {module_id: number}) {
  const deleteModuleWithId = deleteModuleAction.bind(null, module_id);
 
  return (
    <form action={deleteModuleWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}