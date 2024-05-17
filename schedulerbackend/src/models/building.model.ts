import { RowDataPacket } from "mysql2";

export default interface Building extends RowDataPacket {
  building_id?: number;
  building_name?: string;
  school?: string;
}