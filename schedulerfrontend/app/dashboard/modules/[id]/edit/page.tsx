// server-side
import Form from '@/app/ui/modules/edit-module';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getModuleByID, getCourses, getLecturerUsers, getClasstypeByModuleID } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const module_id = parseInt(params.id);
    const module = await getModuleByID(module_id);
    const courses = await getCourses();
    const lecturers = await getLecturerUsers();

    const classtype = await getClasstypeByModuleID(module_id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Modules', href: '/dashboard/modules' },
          {
            label: 'Edit Module',
            href: `/dashboard/modules/${module_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form module={ module } courses={ courses } lecturers={ lecturers } classtype={ classtype }/>
    </main>
  );
}
