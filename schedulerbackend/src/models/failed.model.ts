import { RowDataPacket } from "mysql2"

export default interface Failed extends RowDataPacket {
  failed_id: number;
  schedule_id?: number;
  module_id?: number;
  classtype?: string;
  class_num?: string;
}