import { RowDataPacket } from "mysql2"

export default interface Module extends RowDataPacket {
    module_id: number;
    course_id: number;
    module_name: string;
    module_code?: string;
    module_year?: number;
    user_id: number;
    timetable_id: number;
    enrolled_students: number;
    capacity?: number;
    classtype_id: number;
    sub_lecturer_id: number;
  }