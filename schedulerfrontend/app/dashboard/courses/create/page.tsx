// server-side
import Form from '@/app/ui/courses/create-course';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getBuildings, getCourses } from '@/app/lib/data';
 
export default async function Page() {
  const courses = await getCourses();
  let buildings = await getBuildings();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Courses', href: '/dashboard/courses' },
          {
            label: 'Create Course',
            href: '/dashboard/courses/create',
            active: true,
          },
        ]}
      />
      <Form  courses = { courses } buildings = { buildings }/>
    </main>
  );
}