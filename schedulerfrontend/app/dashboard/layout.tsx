// server-side
import SideNav from '@/app/ui/dashboard/sidenav';
import { Users } from '../lib/definitions';
import { getLecturerUsers, getStudentUsers } from '../lib/data';

// Sets the side-nav links based on if user is student or lecturer
export default async function Layout({ children }: { children: React.ReactNode }) {

  const students: Users[] = await getStudentUsers();
  const lecturers: Users[] = await getLecturerUsers();

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav students={students} lecturers={lecturers}/>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}



