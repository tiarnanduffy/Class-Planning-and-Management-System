import connection from "../db";

import { OkPacket } from "mysql2";
import Classtype from "../models/classtype.model";
import Module from "../models/module.model";

interface IModuleRepository {
  create(module: Module): Promise<Module>;
  create2(module: Module, classtype: Classtype): Promise<Module>;
  retrieveAll(): Promise<Module[]>;
  retrieveById(module_id: number): Promise<Module | undefined>;
  retrieveByCourseId(course_id: number): Promise<Module[] | undefined>;
  update(module: Module): Promise<number>;
  update2(module: Module, classtype: Classtype): Promise<number>;
  delete(module_id: number): Promise<number>;
}

class ModuleRepository implements IModuleRepository {

  create(module: Module): Promise<Module> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO timetable VALUES ();",
        [],
        (err, res) => {
          if (err) reject(err);
          else {
            connection.query<OkPacket>("INSERT INTO module (course_id, module_name, module_code, module_year, lecturer_id, timetable_id, num_lectures, enrolled_students, capacity) VALUES(?,?,?,?,?,?,?,?,?);",
              [module.course_id, module.module_name, module.module_code, module.module_year, module.lecturer_id, res.insertId, module.num_lectures, module.enrolled_students, module.capacity],
              (err, res) => {
                if (err) reject(err);
                else {
                  this.retrieveById(res.insertId).then((module) => resolve(module!)).catch(reject);
                }
              }
            )
          }
        }
      );
    });
  }

  create2(module: Module, classtype: Classtype): Promise<Module> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO timetable VALUES ();",
        [],
        (err, res) => {
          if (err) reject(err);
          else {
            const timetableId = res.insertId;
            connection.query<OkPacket>(
              "INSERT INTO classtype (num_lectures, lecture_facility, num_tutorials, tutorial_facility, num_practicals, practical_facility, num_labs, lab_facility, num_advisories, advisory_facility) VALUES(?,?,?,?,?,?,?,?,?,?);",
              [classtype.num_lectures, classtype.lecture_facility, classtype.num_tutorials,
              classtype.tutorial_facility, classtype.num_practicals, classtype.practical_facility, classtype.num_labs,
              classtype.lab_facility, classtype.num_advisories, classtype.advisory_facility],
              (err, res) => {
                if (err) reject(err);
                else {
                  const classTypeId = res.insertId;
                  connection.query<OkPacket>(
                    "INSERT INTO module (course_id, module_name, module_code, module_year, user_id, timetable_id, enrolled_students, capacity, sub_lecturer_id, classtype_id) VALUES(?,?,?,?,?,?,?,?,?,?);",
                    [module.course_id, module.module_name, module.module_code, module.module_year, module.user_id, timetableId, module.enrolled_students, module.capacity, module.sub_lecturer_id, classTypeId],
                    (err, res) => {
                      if (err) reject(err);
                      else {
                        this.retrieveById(res.insertId).then((module) => resolve(module!)).catch(reject);
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  }



  retrieveAll(): Promise<Module[]> {
    return new Promise((resolve, reject) => {
      connection.query<Module[]>(
        "SELECT * FROM module",
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  retrieveById(module_id: number): Promise<Module> {
    return new Promise((resolve, reject) => {
      connection.query<Module[]>(
        "SELECT * FROM module WHERE module_id = ?",
        [module_id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  retrieveByCourseId(course_id: number): Promise<Module[]> {
    return new Promise((resolve, reject) => {
      connection.query<Module[]>(
        "SELECT * FROM module WHERE course_id = ?",
        [course_id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  update(module: Module): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE module SET course_id = ?, module_name = ?, module_year = ?, lecturer_id = ?,  enrolled_students = ?, capacity = ?, sub_lecturer_id = ? WHERE module_id = ?",
        [module.course_id, module.module_name, module.module_year, module.lecturer_id, module.enrolled_students, module.capacity, module.sub_lecturer_id, module.module_id],
        (err, res) => {
          if (err) {
            console.error("Error updating module:", err);
            reject(err);
          }
          else {
            resolve(res.affectedRows);
          }

        }
      );
    });
  }

  update2(module: Module, classtype: Classtype): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE module SET course_id = ?, module_name = ?, module_code = ?, module_year = ?, user_id = ?, enrolled_students = ?, capacity = ?, classtype_id = ?, sub_lecturer_id = ? WHERE module_id = ?",
        [module.course_id, module.module_name, module.module_code, module.module_year, module.user_id, module.enrolled_students, module.capacity, module.classtype_id, module.sub_lecturer_id, module.module_id],
        (err, res) => {
          if (err) {
            console.error("Error updating module:", err);
            reject(err);
          } else {
            connection.query<OkPacket>(
              "UPDATE classtype SET num_lectures = ?, lecture_facility = ?, num_tutorials = ?, tutorial_facility = ?, num_practicals = ?, practical_facility = ?, num_labs = ?, lab_facility = ?, num_advisories = ?, advisory_facility = ? WHERE classtype_id = ?;",
              [classtype.num_lectures, classtype.lecture_facility, classtype.num_tutorials,
                classtype.tutorial_facility, classtype.num_practicals, classtype.practical_facility, classtype.num_labs,
                classtype.lab_facility, classtype.num_advisories, classtype.advisory_facility, module.classtype_id],
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
          }
        }
      );
    });
  }

  delete(module_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "SELECT classtype_id FROM module WHERE module_id = ?",
        [module_id],
        (err, res) => {
          if (err) reject(err);
          else {
            const classtype_id = (res as any)[0].classtype_id;
            connection.query<OkPacket>(
              "DELETE FROM module WHERE module_id = ?",
              [module_id],
              (err, res) => {
                if (err) reject(err);
                else {
                  connection.query<OkPacket>(
                    "DELETE FROM classtype WHERE classtype_id = ?",
                    [classtype_id],
                    (err, res) => {
                      if (err) reject(err);
                      else resolve(res.affectedRows);
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  }

}

export default new ModuleRepository();