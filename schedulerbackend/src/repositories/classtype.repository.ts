import connection from "../db";
import Classtype from "../models/classtype.model";
import { OkPacket } from "mysql2";

interface IClasstypeRepository {
    create (classtype: Classtype): Promise<Classtype>;
    retrieveById(classtype_id: number): Promise<Classtype>;
    retrieveByModuleId(module_id: number): Promise<Classtype>;
    update(classtype: Classtype): Promise<number>;
}

class ClasstypeRepository implements IClasstypeRepository {

    create(classtype: Classtype): Promise<Classtype> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO classtype (num_lectures, lecture_facility, num_tutorials, tutorial_facility, num_practicals, practical_facility, num_labs, lab_facility, num_advisories, advisory_facility) VALUES(?,?,?,?,?,?,?,?,?,?);",
                [classtype.num_lectures, classtype.lecture_facility, classtype.num_tutorials,
                 classtype.tutorial_facility, classtype.num_practicals, classtype.practical_facility, classtype.num_labs,
                 classtype.lab_facility, classtype.num_advisories, classtype.advisory_facility],
                 (err,res) => {
                    if(err) reject(err);
                    else
                        this.retrieveById(res.insertId)
                    .then((classtype) => resolve(classtype!))
                    .catch(reject);
                 }
            )
        })
    }

    retrieveById(classtype_id: number): Promise<Classtype> {
        return new Promise((resolve, reject) => {
          connection.query<Classtype[]>(
            "SELECT * FROM classtype WHERE classtype_id = ?",
            [classtype_id],
            (err, res) => {
              if (err) reject(err);
              else resolve(res?.[0]);
            }
          );
        });
      }

      retrieveByModuleId(module_id: number): Promise<Classtype> {
        return new Promise((resolve, reject) => {
          connection.query<Classtype[]>(
            "SELECT module.*, classtype.* FROM module JOIN classtype ON module.classtype_id = classtype.classtype_id WHERE module.module_id = ?;",
            [module_id],
            (err, res) => {
              if (err) reject(err);
              else resolve(res?.[0]);
            }
          );
        });
      }

      retrieveAll(): Promise<Classtype[]> {
        return new Promise((resolve, reject) => {
          connection.query<Classtype[]>(
            "SELECT * FROM classtype;",
            (err, res) => {
              if (err) reject(err);
              else resolve(res);
            }
          );
        });
      }

      update(classtype: Classtype): Promise<number> {
        return new Promise((resolve, reject) => {
          connection.query<OkPacket>(
            "UPDATE classtype SET num_lectures = ?, lecture_facility = ?, num_tutorials = ?, tutorial_facility = ?, num_practicals = ?, practical_facility = ?, num_labs = ?, lab_facility = ?, num_advisories = ?, advisory_facility = ? WHERE classtype_id = ?;",
            [classtype.num_lectures, classtype.lecture_facility, classtype.num_tutorials,
              classtype.tutorial_facility, classtype.num_practicals, classtype.practical_facility, classtype.num_labs,
              classtype.lab_facility, classtype.num_advisories, classtype.advisory_facility, classtype.classtype_id],
              (err, res) => {
                if (err) {
                  console.error("Error updating classtype;", err);
                  reject(err);
                }
                else {
                  resolve(res.affectedRows);
                };
              }
          );
        });
      }
}

export default new ClasstypeRepository();