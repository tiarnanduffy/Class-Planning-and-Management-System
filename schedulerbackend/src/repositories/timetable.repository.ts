import connection from "../db";
import Timetable from "../models/timetable.model";
import ModuleTimetable from "../models/moduletimetable";
import { OkPacket, OkPacketParams } from "mysql2";
import courseRepository from "./course.repository";
import pendingRepository from "./pending.repository";

interface ITimetableRepository {
    retrieveAll(): Promise<Timetable[]>;
    retrieveByTimetableId(timetable_id: number): Promise<Timetable>;
    retrieveModuleTimetables(): Promise<ModuleTimetable[]>;
    updateTimetableSlot(timetable_id: number, slot: string, module_name: string): Promise<number>;
    resetTimetables(): Promise<number>;
  }
  
  class TimetableRepository implements ITimetableRepository {

    retrieveAll(): Promise<Timetable[]> {
      return new Promise((resolve, reject) => {
          connection.query<Timetable[]>(
              "SELECT * FROM timetable",
              (err, res) => {
                if(err) reject(err);
                else resolve(res);
              }
          );
      });
  }

  retrieveByTimetableId(timetable_id: number): Promise<Timetable> {
      return new Promise((resolve, reject) => {
        connection.query<Timetable[]>(
          "SELECT * FROM timetable WHERE timetable_id = ?",
          [timetable_id],
          (err, res) => {
            if (err) reject(err);
            else resolve(res?.[0]);
          }
        );
      });
    }

    retrieveModuleTimetables(): Promise<ModuleTimetable[]> {
      return new Promise((resolve, reject) => {
        connection.query<ModuleTimetable[]>(
          "select module.module_id, module.module_name, timetable.* from timetable, module where timetable.timetable_id = module.timetable_id;",
          (err, res) => {
            if (err) reject(err);
            else resolve(res);
          }
        );
      });
    }

    // promise<T> indicates what the return is - T is what is returned
    updateTimetableSlot(timetable_id: number, slot: string, module_name: string): Promise<number> {
      return new Promise((resolve, reject) => {
        connection.query<OkPacket>(
          "UPDATE timetable SET ?? = ? WHERE timetable_id = ?",
          [slot, module_name, timetable_id],
          (err, res) => {
            if (err) reject(err);
            else resolve(res.affectedRows);
          }
        );
      });
    }

    resetTimetables(): Promise<number> {
      return new Promise((resolve, reject) => {
        connection.query<OkPacket>(
          "UPDATE timetable SET m9 = 'available', m10 = 'available', m11 = 'available', m12 = 'available', m13 = 'available', m14 = 'available', m15 = 'available', m16 = 'available', t9 = 'available', t10 = 'available', t11 = 'available', t12 = 'available', t13 = 'available', t14 = 'available', t15 = 'available', t16 = 'available', w9 = 'available', w10 = 'available', w11 = 'available', w12 = 'available', w13 = 'available', w14 = 'available', w15 = 'available', w16 = 'available', th9 = 'available', th10 = 'available', th11 = 'available', th12 = 'available', th13 = 'available', th14 = 'available', th15 = 'available', th16 = 'available', f9 = 'available', f10 = 'available', f11 = 'available', f12 = 'available', f13 = 'available', f14 = 'available', f15 = 'available', f16 = 'available';",
          (err, res) => {
            if (err) {
              reject(err);
            } else {
              courseRepository.resetScheduled()
                .then(() => {
                  pendingRepository.setAllPendingNull()
                    .then(() => {
                      resolve(res.affectedRows);
                    })
                    .catch((err) => {
                      reject(err);
                      console.error("Error resetting pending list:", err);
                    });
                })
                .catch((err) => {
                  reject(err);
                  console.error("Error resetting scheduled courses:", err);
                });
            }
          }
        );
      });
    }
  }
    
  
  export default new TimetableRepository();