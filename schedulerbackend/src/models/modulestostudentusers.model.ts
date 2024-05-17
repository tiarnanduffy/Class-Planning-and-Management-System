import { RowDataPacket } from "mysql2"

export default interface ModulesToStudentUsers extends RowDataPacket {
    module_id: number;
    user_id: number;
  }