import { RowDataPacket } from "mysql2"

export default interface Succeeded extends RowDataPacket {
    succeeded_id: number;
    schedule_id?: number;
    module_id?: number;
    user_id?: number;
    room_id?: number;
    classtype?: string;
    slot?: string;
  }