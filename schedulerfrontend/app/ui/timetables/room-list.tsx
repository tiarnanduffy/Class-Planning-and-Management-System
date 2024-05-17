import { Rooms } from "@/app/lib/definitions";
import { Buildings } from "@/app/lib/definitions";

// List of rooms. Select one to view their timetable.
export default function RoomList({ rooms, buildings, handleClick }: { rooms: Rooms[], buildings: Buildings[], handleClick: Function }) {
    return (
        <div>
            <table className="min-w-full">
            <thead className="rounded-lg text-center text-sm font-normal">
                    <tr>
                        <th scope="col" className="bg-gray-200 px-4 py-8 font-medium sm:pl-6">
                            Select Room Timetable
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white overflow-y-auto h-8">
                    {rooms?.map((r) => {
                        const building = buildings.find((b) => b.building_id === r.building_id);
                        const buildingName = building ? building.building_name : "Unknown Building";

                        return (
                            <tr
                                key={r.room_id}
                                onClick={() => handleClick(r.timetable_id)}
                                className="h-20 border-y-2 border-black-100"
                            >
                                <td className="whitespace-nowrap pl-6 pr-3 text-xs hover:bg-slate-300">
                                    {r.room_id} - {r.room_name} - {buildingName} - tt {r.timetable_id}
                                        <p>
                                            Room Capacity: {r.capacity}
                                        </p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

    )
}