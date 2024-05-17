import { RowDataPacket } from "mysql2";

export default interface Constraints extends RowDataPacket {
    traversalOrder: string;
    moduleOrder: string[];
    classOrder: string[];
    lecRoomLeeway: string;
    tutRoomLeeway: string;
    praRoomLeeway: string;
    labRoomLeeway: string;
    advRoomLeeway: string;
    lecStuLeeway: string;
    tutStuLeeway: string;
    praStuLeeway: string;
    labStuLeeway: string;
    advStuLeeway: string;
    lecClassesPerDay: string;
    tutClassesPerDay: string;
    praClassesPerDay: string;
    labClassesPerDay: string;
    advClassesPerDay: string;
    useSubLecturer: boolean;
}
