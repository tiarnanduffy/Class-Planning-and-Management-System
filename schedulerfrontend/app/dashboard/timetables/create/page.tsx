// server-side
import Form from '@/app/ui/timetables/create-timetable';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getBuildings } from '@/app/lib/data';
import { getModules } from '@/app/lib/data';
import { getCourses } from '@/app/lib/data';
import { getRooms } from '@/app/lib/data';

export default async function Page() {
    const modules = await getModules();
    const courses = await getCourses();
    const rooms = await getRooms();
    const buildings = await getBuildings();

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Timetables', href: '/dashboard/timetables' },
                    {
                        label: 'Create Timetable',
                        href: '/dashboard/timetables/create',
                        active: true,
                    },
                ]}
            />
            <Form modules={modules} rooms={rooms} buildings={buildings} courses={courses}/>
        </main>
    )
}
