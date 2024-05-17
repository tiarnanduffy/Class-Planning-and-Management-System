// server-side
import Form from '@/app/ui/users/create-lecturer';
import Breadcrumbs from '@/app/ui/breadcrumbs';
 
export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Lecturer', href: '/dashboard/studentlecturers' },
          {
            label: 'Create Lecturer',
            href: '/dashboard/studentlecturers/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}