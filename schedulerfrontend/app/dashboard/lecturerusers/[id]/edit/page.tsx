// server-side
import Form from '@/app/ui/users/edit-lecturer';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getUserByID } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const user_id = parseInt(params.id);
    const lecturer = await getUserByID(user_id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Lecturer', href: '/dashboard/lecturerusers' },
          {
            label: 'Edit Lecturer',
            href: `/dashboard/lecturerusers/${user_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form lecturer={ lecturer } />
    </main>
  );
}
