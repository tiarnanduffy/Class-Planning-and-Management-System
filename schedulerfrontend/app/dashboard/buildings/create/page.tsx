// server-side
import Form from '@/app/ui/buildings/create-building';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { getBuildings } from '@/app/lib/data';
 
export default async function Page() {
  const buildings = await getBuildings()

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Buildings', href: '/dashboard/buildings' },
          {
            label: 'Create Building',
            href: '/dashboard/buildings/create',
            active: true,
          },
        ]}
      />
      <Form  buildings = { buildings }/>
    </main>
  );
}
