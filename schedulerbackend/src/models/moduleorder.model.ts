import { RowDataPacket } from "mysql2";

export default interface ModuleOrder extends RowDataPacket {
    moduleorder_id: number;
    constraints_id: number;
    module_id: number;
}
