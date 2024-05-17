// server-side
import StudentTable from '@/app/selectuser/studenttable';
import { Courses, Users } from '@/app/lib/definitions';
import { getCourses, getStudentUsers } from '@/app/lib/data';

export default async function Page() {

    const courses: Courses[] = await getCourses();
    const students: Users[] = await getStudentUsers();

    return (
        <div>
            <StudentTable students={students} courses={courses}/>
        </div>
    )
    

}