import { RowDataPacket } from "mysql2"

export default interface Schedule extends RowDataPacket {
    schedule_id: number;
    datetime?: Date;
    status?: string;
    course_id?: number;
  }