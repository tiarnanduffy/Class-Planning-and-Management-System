import { RowDataPacket } from "mysql2"

export default interface Reason extends RowDataPacket {
    reason_id: number;
    schedule_id?: number;
    reason?: string;
    module_id?: number;
    classtype?: string
  }



  