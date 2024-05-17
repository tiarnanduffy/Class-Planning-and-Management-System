// server-side
import LecturerTable from '@/app/selectuser/lecturertable';
import { Users } from '@/app/lib/definitions';
import { getLecturerUsers } from '@/app/lib/data';

export default async function Page() {

    const lecturers: Users[] = await getLecturerUsers();

    return (
        <div>
            <LecturerTable lecturers={lecturers}/>
        </div>
    )
    

}