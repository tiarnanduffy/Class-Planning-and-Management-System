import { RowDataPacket } from "mysql2"

export default interface Course extends RowDataPacket {
  course_id?: number;
  course_name?: string;
  school?: string;
  qualification?: string;
  years?: number;
  building_id: number;
  pending_id: number;
  scheduled: boolean;
}