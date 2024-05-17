import { RowDataPacket } from "mysql2"

export default interface Room extends RowDataPacket {
    room_id: number;
    room_name?: string;
    building_id: number;
    capacity: number;
    facility?: string;
    timetable_id: number;
  }