// server-side
import { getSucceededRows, getFailedRows, getSuggestionRows, getReasonRows, getScheduleRow, getCourseByID, getModulesByCourseId, getRoomsByBuildingID, getBuildingIDByCourseID, getLecturerUsers, getModuleOrders, getClassOrders, getConstraintsTable } from '@/app/lib/data';
import { Succeeded, Failed, Suggestion, Reason, Schedule, Courses, Modules, Rooms, Users, ModuleOrder, ClassOrder, ConstraintsTable } from '@/app/lib/definitions';
import Form from '@/app/ui/timetables/timetable-outcomes';

export default async function Page({ params }: { params: { id: string } }) {

    const schedule_id = parseInt(params.id);
    const scheduleRow: Schedule = await getScheduleRow(schedule_id);
    const failedRows: Failed[] = await getFailedRows(schedule_id);
    const suggestionRows: Suggestion[] = await getSuggestionRows(schedule_id);
    const reasonRows: Reason[] = await getReasonRows(schedule_id);
    const course: Courses = await getCourseByID(scheduleRow.course_id);
    const modules: Modules[] = await getModulesByCourseId(course.course_id);
    const building_id_string: string = await getBuildingIDByCourseID(course.course_id);
    const building_id: number = parseInt(building_id_string);
    const rooms: Rooms[] = await getRoomsByBuildingID(building_id);
    const lecturers: Users[] = await getLecturerUsers();
    const constraintsTable: ConstraintsTable = await getConstraintsTable(schedule_id);
    const constraints_id: number = constraintsTable.constraints_id;
    const moduleOrder: ModuleOrder[] = await getModuleOrders(constraints_id);
    const classOrder: ClassOrder[] = await getClassOrders(constraints_id);
    const succeededRows: Succeeded[] = await getSucceededRows(schedule_id);

    // Delay added to display the Failure or Succeeded icon
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return (
            <main>
                <Form scheduleRow={scheduleRow} succeededRows={succeededRows} failedRows={failedRows} suggestionRows={suggestionRows} reasonRows={reasonRows} course={course} modules={modules} rooms={rooms} lecturers={lecturers} constraintsTable={constraintsTable} moduleOrder={moduleOrder} classOrder={classOrder} />
            </main>
        )
    
}