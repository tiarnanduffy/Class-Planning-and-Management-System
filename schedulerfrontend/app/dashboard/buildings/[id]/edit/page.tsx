// server-side
import Form from '@/app/ui/buildings/edit-building';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getBuildingByID } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
    const building_id = parseInt(params.id);
    const building = await getBuildingByID(building_id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Buildings', href: '/dashboard/buildings' },
          {
            label: 'Edit Building',
            href: `/dashboard/buildings/${building_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form building = { building }/>
    </main>
  );
}
