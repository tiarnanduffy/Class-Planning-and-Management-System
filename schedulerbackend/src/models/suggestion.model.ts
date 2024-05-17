import { RowDataPacket } from "mysql2"

export default interface Suggestion extends RowDataPacket {
    suggestion_id: number;
    schedule_id?: number;
    constraint_type?: string;
    slots?: string;
    required_leeway?: number;
  }