import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket {
    user_id: number;
    user_type?: string;
    firstname?: string;
    lastname?: string;
    course_id?: number;
    course_year?: number;
    ss_number?: number;
    timetable_id: number;
  }