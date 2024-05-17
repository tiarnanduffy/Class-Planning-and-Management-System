// server-side
import Form from '@/app/ui/users/edit-student';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getCourses, getUserByID } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const user_id = parseInt(params.id);
    const student = await getUserByID(user_id);
    const courses = await getCourses();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Students', href: '/dashboard/studentsusers' },
          {
            label: 'Edit Student',
            href: `/dashboard/studentusers/${user_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form student={ student } courses={ courses }/>
    </main>
  );
}