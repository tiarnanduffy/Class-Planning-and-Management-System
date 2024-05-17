import { RowDataPacket } from "mysql2";

export default interface Pending extends RowDataPacket {
  pending_id?: number;
  pending_list?: string | null;
}