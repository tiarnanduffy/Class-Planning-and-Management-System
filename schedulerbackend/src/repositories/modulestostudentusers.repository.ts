import connection from "../db";
import ModulesToStudentUsers from "../models/modulestostudentusers.model";
import { OkPacket, RowDataPacket } from "mysql2";

interface IModulesToStudentUsersRepository {
  create(module_id: number, user_id: number): Promise<void>;
  retrieveModulesByStudentUserId(user_id: number): Promise<number[]>;
}

class ModulesToStudentUsersRepository implements IModulesToStudentUsersRepository {


  create(module_id: number, user_id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO modules_to_studentusers (module_id, user_id) VALUES (?, ?)",
        [module_id, user_id],
        (err, res) => {
          if (err) reject(err);
          else {
            connection.query<OkPacket>(
              "UPDATE module SET enrolled_students = enrolled_students + 1 WHERE module_id = ?",
              [module_id],
              (err, res) => {
                if (err) reject(err);
                else {
                  resolve();
                }
              }
            );
          }
        }
      );
    });
  }
  


  retrieveModulesByStudentUserId(user_id: number): Promise<number[]> {
    return new Promise<number[]>((resolve, reject) => {
      connection.query(
        "SELECT module_id FROM modules_to_studentusers WHERE user_id = ?",
        [user_id],
        (err, rows: RowDataPacket[]) => {
          if (err) {
            reject(err);
          } else {
            const moduleIds: number[] = rows.map(row => row.module_id);
            resolve(moduleIds);
          }
        }
      );
    });
  }



}

export default new ModulesToStudentUsersRepository();