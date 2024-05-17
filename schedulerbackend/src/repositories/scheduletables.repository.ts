
import { OkPacket, RowDataPacket } from "mysql2";
import connection from "../db";
import Schedule from "../models/schedule.model";
import Succeeded from "../models/succeeded.model";
import Failed from "../models/failed.model";
import Suggestion from "../models/suggestion.model";
import Reason from "../models/reason.model";

interface IScheduletablesRepository {
    getMostRecentScheduleId(): Promise<number>;
    addScheduleRow(course_id: number): Promise<number>;
    updateScheduleRow(status: string, schedule_id: number): Promise<number>;
    addSucceeded(schedule_id: number, module_id: number, user_id: number, room_id: number, classtype: string, slot: string): Promise<number>;
    addFailed(schedule_id: number, module_id: number, classtype: string, class_num: string): Promise<number>;
    addSuggestion(schedule_id: number, constraint: string, slots: string, required_leeway: number): Promise<number>;
    addReason(schedule_id: number, reason: string, module_id: number, classtype: string): Promise<number>;
    getSuccededByScheduleId(schedule_id: number): Promise<Succeeded[]>;
    getFailedByScheduleId(schedule_id: number): Promise<Failed[]>;
    getSuggestionByScheduleId(schedule_id: number): Promise<Suggestion[]>;
    getReasonByScheduleId(schedule_id: number): Promise<Reason[]>;
    getScheduleById(schedule_id: number): Promise<Schedule>;
    deleteRows(schedule_id: number): Promise<number>;
    getScheduleRows(): Promise<Schedule[]>;
}

class ScheduletablesRepository implements IScheduletablesRepository {

    // Scheduletables contains logic for all outcome-required tables, rather than them all having separate classes

    getMostRecentScheduleId(): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>(
                "SELECT schedule_id FROM schedule ORDER BY schedule_id DESC LIMIT 1",
                (err, rows) => {
                    if (err) {
                        console.error("Error fetching most recent schedule_id: ", err);
                        reject(err);
                    } else {
                        if (rows.length > 0) {
                            const mostRecentScheduleId = rows[0].schedule_id;
                            resolve(mostRecentScheduleId);
                        } else {
                            reject(new Error("No schedule_id found"));
                        }
                    }
                }
            );
        });
    }

    // remove from ?? where schedule_id = ?



    addScheduleRow(course_id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            const datetime = new Date();
            connection.query<OkPacket>(
                "INSERT INTO schedule (datetime, course_id) VALUES (?,?)",
                [datetime, course_id],
                (err, res) => {
                    if (err) {
                        console.error("Error adding schedule row: ", err);
                        reject(err);
                    }
                    else {
                        resolve(res.affectedRows);

                    }
                }
            );
        });
    }

    updateScheduleRow(status: string, schedule_id: number): Promise<number>{
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "UPDATE schedule SET status = ? WHERE schedule_id = ?",
                [status, schedule_id],
                (err, res) => {
                    if (err) {
                        console.error("Error updating schedule row: ", err);
                        reject(err);
                    }
                    else {
                        resolve(res.affectedRows);

                    }
                }
            );
        });
    }

    addSucceeded(schedule_id: number, module_id: number, user_id: number, room_id: number, classtype: string, slot:string): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO succeeded (schedule_id, module_id, user_id, room_id, classtype, slot) VALUES (?,?,?,?,?,?)",
                [schedule_id, module_id, user_id, room_id, classtype, slot],
                (err, res) => {
                    if (err) {
                        console.error("Error adding succeeded row: ", err);
                        reject(err);
                    }
                    else {
                        resolve(res.affectedRows);

                    }
                }
            );
        });
    }

    addFailed(schedule_id: number, module_id: number, classtype: string, class_num: string): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO failed (schedule_id, module_id, classtype, class_num) VALUES (?,?,?,?)",
                [schedule_id, module_id, classtype, class_num],
                (err, res) => {
                    if (err) {
                        console.error("Error adding failed row: ", err);
                        reject(err);
                    }
                    else {
                        resolve(res.affectedRows);

                    }
                }
            );
        });
    }

    addSuggestion(schedule_id: number, constraint: string, slots: string, required_leeway: number): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO suggestion (schedule_id, constraint_type, slots, required_leeway) VALUES (?,?,?,?)",
                [schedule_id, constraint, slots, required_leeway],
                (err, res) => {
                    if (err) {
                        console.error("Error adding suggestion row: ", err);
                        reject(err);
                    }
                    else {
                        resolve(res.affectedRows);

                    }
                }
            );
        });
    }

    addReason(schedule_id: number, reason: string, module_id: number, classtype: string): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO reason (schedule_id, reason, module_id, classtype) VALUES (?,?,?,?)",
                [schedule_id, reason, module_id, classtype],
                (err, res) => {
                    if (err) {
                        console.error("Error adding suggestion row: ", err);
                        reject(err);
                    }
                    else {
                        resolve(res.affectedRows);

                    }
                }
            );
        });
    }

    getSuccededByScheduleId(schedule_id: number): Promise<Succeeded[]> {
        return new Promise((resolve, reject) => {
            connection.query<Succeeded[]>(
                "SELECT * FROM succeeded WHERE schedule_id = ?",
                [schedule_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });

    }

    getFailedByScheduleId(schedule_id: number): Promise<Failed[]> {
        return new Promise((resolve, reject) => {
            connection.query<Failed[]>(
                "SELECT * FROM failed WHERE schedule_id = ?",
                [schedule_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });

    }

    getSuggestionByScheduleId(schedule_id: number): Promise<Suggestion[]> {
        return new Promise((resolve, reject) => {
            connection.query<Suggestion[]>(
                "SELECT * FROM suggestion WHERE schedule_id = ?",
                [schedule_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });

    }

    getReasonByScheduleId(schedule_id: number): Promise<Reason[]> {
        return new Promise((resolve, reject) => {
            connection.query<Reason[]>(
                "SELECT * FROM reason WHERE schedule_id = ?",
                [schedule_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });

    }

    getScheduleById(schedule_id: number): Promise<Schedule> {
        return new Promise((resolve, reject) => {
            connection.query<Schedule[]>(
                "SELECT * FROM schedule WHERE schedule_id = ?",
                [schedule_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res?.[0]);
                }
            );
        });

    }

    deleteRows(schedule_id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
              "DELETE FROM failed WHERE schedule_id = ?;",
              [schedule_id],
              (err, res) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
              }
            );
          });
    }

    getScheduleRows(): Promise<Schedule[]> {
        return new Promise((resolve, reject) => {
            connection.query<Schedule[]>(
                "SELECT * FROM schedule ORDER BY datetime desc LIMIT 10;",
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

}

export default new ScheduletablesRepository();