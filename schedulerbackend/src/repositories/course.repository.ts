import { error } from "console";
import connection from "../db";
import Course from "../models/course.model";
import { OkPacket } from "mysql2";

interface ICourseRepository {
  save(course: Course): Promise<Course>;
  retrieveAll(searchParams: { [key: string]: string | number }): Promise<Course[]>;
  retrieveById(course_id: number): Promise<Course | undefined>;
  update(course: Course): Promise<number>;
  delete(course_id: number): Promise<number>;
  setScheduled(scheduled: boolean, course_id: number): Promise<number>;
  resetScheduled(): Promise<number>;
}

class CourseRepository implements ICourseRepository {

  // create
  save(course: Course): Promise<Course> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "INSERT INTO pending VALUES ();",
        [],
        (err, res) => {
          if (err) reject(err);
          else {
            connection.query<OkPacket>(
              "INSERT INTO course (course_name, school, qualification, years, building_id, pending_id) VALUES(?,?,?,?,?,?);",
              [course.course_name, course.school, course.qualification, course.years, course.building_id, res.insertId],
              (err, res) => {
                if (err) reject(err);
                else
                  this.retrieveById(res.insertId).then((course) => resolve(course!)).catch(reject);
              }
            );
          }
        }
      );
    });
  }

  retrieveAll(searchParams: { course_name?: string }): Promise<Course[]> {
    let query: string = "SELECT * FROM course";
    let conditions: string[] = [];

    if (searchParams?.course_name) {
      conditions.push(`LOWER(course_name) LIKE '%${searchParams.course_name.toLowerCase()}%'`);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    return new Promise((resolve, reject) => {
      connection.query<Course[]>(query, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  retrieveById(course_id: number): Promise<Course> {
    return new Promise((resolve, reject) => {
      connection.query<Course[]>(
        "SELECT * FROM course WHERE course_id = ?",
        [course_id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res?.[0]);
        }
      );
    });
  }

  update(course: Course): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE course SET course_name = ?, school = ?, qualification = ?, years = ?, building_id = ? WHERE course_id = ?",
        [course.course_name, course.school, course.qualification, course.years, course.building_id, course.course_id],
        (err, res) => {
          if (err) {
            reject(err);
          }
          else resolve(res.affectedRows);
        }
      );
    });
  }

  setScheduled(scheduled: boolean, course_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE course SET scheduled = ? WHERE course_id = ?",
        [scheduled, course_id],
        (err, res) => {
          if (err) {
            reject(err);
          }
          else resolve(res.affectedRows);
        }
      );
    });
  }

  resetScheduled(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "UPDATE course SET scheduled = false;",
        (err, res) => {
          if (err) {
            reject(err);
          }
          else resolve(res.affectedRows);
        }
      )
    })
  }

  // works
  delete(course_id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        "DELETE FROM course WHERE course_id = ?",
        [course_id],
        (err, res) => {
          if (err) reject(err);
          else resolve(res.affectedRows);
        }
      );
    });
  }

}

export default new CourseRepository();
