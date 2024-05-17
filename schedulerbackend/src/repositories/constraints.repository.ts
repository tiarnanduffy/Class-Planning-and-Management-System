
import { OkPacket, RowDataPacket } from "mysql2";
import connection from "../db";
import ConstraintsTable from "../models/constraintsTable.model";
import ClassOrder from "../models/classorder.model";
import ModuleOrder from "../models/moduleorder.model";

interface IConstraintsRepository {

    getMostRecentConstraintsId(): Promise<number>;
    addConstraints(schedule_id: number, traversalOrder: string, moduleOrderType: string, lecRoomLeeway: string, tutRoomLeeway: string, praRoomLeeway: string,
        labRoomLeeway: string, advRoomLeeway: string, lecStuLeeway: string, tutStuLeeway: string, praStuLeeway: string, labStuLeeway: string,
        advStuLeeway: string, lecClassesPerDay: string, tutClassesPerDay: string, praClassesPerDay: string, labClassesPerDay: string,
        advClassesPerDay: string, useSubLecturer: boolean): Promise<number>;
    addModuleOrder(constraints_id: number, module_id:number): Promise<number>;
    addClassOrder(constraints_id: number, class_name: string): Promise<number>;
    getConstraintsByScheduleId(schedule_id: number): Promise<ConstraintsTable>;
    getModuleOrderByConstraintsId(constraints_id: number): Promise<ModuleOrder[]>;
    getClassOrderByConstraintsId(constraints_id: number): Promise<ClassOrder[]>;
    
}

class ConstraintsRepository implements IConstraintsRepository {

    getMostRecentConstraintsId(): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>(
                "SELECT constraints_id FROM constraints ORDER BY constraints_id DESC LIMIT 1",
                (err, rows) => {
                    if (err) {
                        console.error("Error fetching most recent constraints_id: ", err);
                        reject(err);
                    } else {
                        if (rows.length > 0) {
                            const mostRecentConstraintsId = rows[0].constraints_id;
                            resolve(mostRecentConstraintsId);
                        } else {
                            reject(new Error("No constraints_id found"));
                        }
                    }
                }
            );
        });
    }

    addConstraints(schedule_id: number, traversalOrder: string, moduleOrderType: string, lecRoomLeeway: string, tutRoomLeeway: string, praRoomLeeway: string,
        labRoomLeeway: string, advRoomLeeway: string, lecStuLeeway: string, tutStuLeeway: string, praStuLeeway: string, labStuLeeway: string,
        advStuLeeway: string, lecClassesPerDay: string, tutClassesPerDay: string, praClassesPerDay: string, labClassesPerDay: string,
        advClassesPerDay: string, useSubLecturer: boolean): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO constraints (schedule_id, traversal_order, module_order_type, " +  
                "lec_room_leeway, tut_room_leeway, pra_room_leeway, lab_room_leeway, adv_room_leeway, " +
                "lec_stu_leeway, tut_stu_leeway, pra_stu_leeway, lab_stu_leeway, adv_stu_leeway,"+
                " lec_classes_per_day, tut_classes_per_day, pra_classes_per_day, lab_classes_per_day, adv_classes_per_day, use_sub_lecturer)"+
                " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ",
                [schedule_id, traversalOrder, moduleOrderType,
                    lecRoomLeeway, tutRoomLeeway, praRoomLeeway, labRoomLeeway, advRoomLeeway,
                    lecStuLeeway, tutStuLeeway, praStuLeeway, labStuLeeway, advStuLeeway, 
                    lecClassesPerDay, tutClassesPerDay, praClassesPerDay,labClassesPerDay, advClassesPerDay, useSubLecturer],
                (err, res) => {
                    if (err) reject(err);
                    else
                    resolve(res.affectedRows);
                }
            );
        });
    }

    addModuleOrder(constraints_id: number, module_id: number): Promise<number>{
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO module_order (constraints_id, module_id) VALUES (?,?)",
                [constraints_id, module_id],
                (err, res) => {
                    if (err) reject(err);
                    else
                    resolve(res.affectedRows);
                }
            );
        });
    }

    addClassOrder(constraints_id: number, class_name: string): Promise<number>{
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO class_order (constraints_id, class_name) VALUES (?,?)",
                [constraints_id, class_name],
                (err, res) => {
                    if (err) reject(err);
                    else
                    resolve(res.affectedRows);
                }
            );
        });
    }

    getConstraintsByScheduleId(schedule_id: number): Promise<ConstraintsTable>{
        return new Promise((resolve, reject) => {
            connection.query<ConstraintsTable[]>(
                "SELECT * FROM constraints WHERE schedule_id = ?",
                [schedule_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res?.[0]);
                }
            );
        });
    }

    getModuleOrderByConstraintsId(constraints_id: number): Promise<ModuleOrder[]>{
        return new Promise((resolve, reject) => {
            connection.query<ModuleOrder[]>(
                "SELECT * FROM module_order WHERE constraints_id = ?",
                [constraints_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

    getClassOrderByConstraintsId(constraints_id: number): Promise<ClassOrder[]>{
        return new Promise((resolve, reject) => {
            connection.query<ClassOrder[]>(
                "SELECT * FROM class_order WHERE constraints_id = ?",
                [constraints_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

}

export default new ConstraintsRepository();