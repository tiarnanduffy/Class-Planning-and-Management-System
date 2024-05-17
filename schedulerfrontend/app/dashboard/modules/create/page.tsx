// server shtuff
import Form from '@/app/ui/modules/create-module';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getLecturerUsers } from '@/app/lib/data';
import { getCourses } from '@/app/lib/data';

export default async function Page() {
    const courses = await getCourses();
    const lecturers = await getLecturerUsers();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Modules', href: '/dashboard/modules' },
                    {
                        label: 'Create Module',
                        href: '/dashboard/modules/create',
                        active: true,
                    },
                ]}
            />
            <Form courses={courses} lecturers={lecturers}/>
        </main>
    )
}