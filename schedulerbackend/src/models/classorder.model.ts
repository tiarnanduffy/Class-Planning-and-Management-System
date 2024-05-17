import { RowDataPacket } from "mysql2";

export default interface ClassOrder extends RowDataPacket {
    classorder_id: number;
    constraints_id: number;
    class_name: string;
}
