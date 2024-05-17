// server-side
import Form from '@/app/ui/courses/edit-course';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getCourseByID, getBuildings } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const course_id = parseInt(params.id);
    const course = await getCourseByID(course_id);
    const buildings = await getBuildings();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Courses', href: '/dashboard/courses' },
          {
            label: 'Edit Course',
            href: `/dashboard/courses/${course_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form course={ course } buildings={ buildings }/>
    </main>
  );
}