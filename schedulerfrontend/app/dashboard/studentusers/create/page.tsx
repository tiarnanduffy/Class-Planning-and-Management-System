// server-side
import Form from '@/app/ui/users/create-student';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getCourses } from '@/app/lib/data';
 
export default async function Page() {
  const courses = await getCourses();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Students', href: '/dashboard/studentusers' },
          {
            label: 'Create Student',
            href: '/dashboard/studentusers/create',
            active: true,
          },
        ]}
      />
      <Form courses = { courses } />
    </main>
  );
}