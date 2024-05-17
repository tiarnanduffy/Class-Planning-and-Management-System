// server-side
import Form from '@/app/ui/rooms/edit-room';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getRoomByID, getBuildings } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const room_id = parseInt(params.id);
    const room = await getRoomByID(room_id);
    const buildings = await getBuildings();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Rooms', href: '/dashboard/rooms' },
          {
            label: 'Edit Room',
            href: `/dashboard/rooms/${room_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form room={ room } buildings={ buildings }/>
    </main>
  );
}