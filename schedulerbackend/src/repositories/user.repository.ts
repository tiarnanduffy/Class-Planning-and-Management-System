import { OkPacket } from "mysql2";
import connection from "../db";
import User from "../models/user.model";

interface IUserRepository {
    retrieveByUserId(user_id: number): Promise<User>;
    createStudent(user: User): Promise<User>;
    createLecturer(user: User): Promise<User>;
    retrieveStudents(): Promise<User[]>;
    retrieveLecturers(): Promise<User[]>;
    update(user: User): Promise<number>;
    delete(user_id: number): Promise<number>;
    
}

class UserRepository implements IUserRepository {

    retrieveByUserId(user_id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
                "SELECT * FROM unified_user WHERE user_id = ?",
                [user_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res?.[0]);
                }
            );
        });
    }

    createStudent(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO timetable VALUES ();",
                [],
                (err, res) => {
                    if (err) reject(err);
                    else {
                        connection.query<OkPacket>("INSERT INTO unified_user (user_type, firstname, lastname, course_id, course_year, ss_number, timetable_id) VALUES(?,?,?,?,?,?,?);",
                            ['student', user.firstname, user.lastname, user.course_id, user.course_year, user.ss_number, res.insertId],
                            (err, res) => {
                                if (err) reject(err);
                                else {
                                    this.retrieveByUserId(res.insertId).then((user) => resolve(user!)).catch(reject);
                                }
                            }
                        )
                    }
                }
            );
        });
    }
    
    createLecturer(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO timetable VALUES ();",
                [],
                (err, res) => {
                    if (err) reject(err);
                    else {
                        connection.query<OkPacket>("INSERT INTO unified_user (user_type, firstname, lastname, ss_number, timetable_id) VALUES(?,?,?,?,?);",
                            ['lecturer', user.firstname, user.lastname, user.ss_number, res.insertId],
                            (err, res) => {
                                if (err) reject(err);
                                else {
                                    this.retrieveByUserId(res.insertId).then((user) => resolve(user!)).catch(reject);
                                }
                            }
                        )
                    }
                }
            );
        });
    }

    retrieveStudents(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
                "SELECT * FROM unified_user WHERE user_type = 'student';",
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

    retrieveLecturers(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
                "SELECT * FROM unified_user WHERE user_type = 'lecturer';",
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

    update(user: User): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "UPDATE unified_user SET firstname = ?, lastname = ?, course_id = ?, course_year = ?, ss_number = ? WHERE user_id = ?",
                [user.firstname, user.lastname, user.course_id, user.course_year, user.ss_number, user.user_id],
                (err, res) => {
                    if (err) {
                        console.error("Error updating user:", err);
                        reject(err);
                    }
                    else {
                        resolve(res.affectedRows);
                    }

                }
            );
        });
    }

    delete(user_id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "DELETE FROM unified_user WHERE user_id = ?",
                [user_id],
                (err, res) => {
                    if (err) {
                        console.error("Error deleting student:", err);
                        reject(err);
                    } else {
                        resolve(res.affectedRows);
                    }
                }
            );
        });
    }


}

export default new UserRepository();