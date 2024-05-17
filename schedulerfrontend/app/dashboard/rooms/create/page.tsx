import Form from '@/app/ui/rooms/create-room';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getBuildings, getRooms } from '@/app/lib/data';

export default async function Page() {
  const rooms = await getRooms()
  const buildings = await getBuildings();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Rooms', href: '/dashboard/rooms' },
          {
            label: 'Create Room',
            href: '/dashboard/room/create',
            active: true,
          },
        ]}
      />
      
        <Form rooms={rooms} buildings={buildings} />
      
    </main>
  );
}