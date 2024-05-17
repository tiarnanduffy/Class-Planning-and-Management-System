import connection from "../db";
import Building from "../models/building.model";
import { OkPacket, RowDataPacket } from "mysql2";

interface IBuildingRepository {
    create(building: Building): Promise<Building>;
    retrieveAll(): Promise<Building[]>;
    retrieveById(building_id: number): Promise<Building | undefined>;
    retrieveBuildingIdFromCourseId(course_id: number): Promise<string>;
    retrieveBuildingFromCourseId(course_id: number): Promise<Building[] | undefined>;
    update(building: Building): Promise<number>;
    delete(building_id: number): Promise<number>;
}

class BuildingRepository implements IBuildingRepository {

    create(building: Building): Promise<Building> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "INSERT INTO building (building_name, school) VALUES(?,?);",
                [building.building_name, building.school],
                (err, res) => {
                    if (err) reject(err);
                    else
                        this.retrieveById(res.insertId)
                            .then((building) => resolve(building!))
                            .catch(reject);
                }
            );
        });
    }

    retrieveAll(): Promise<Building[]> {
        return new Promise((resolve, reject) => {
            connection.query<Building[]>(
                "SELECT * FROM building",
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }

    retrieveById(building_id: number): Promise<Building> {
        return new Promise((resolve, reject) => {
            connection.query<Building[]>(
                "SELECT * FROM building WHERE building_id = ?",
                [building_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res?.[0]);
                }
            );
        });
    }

    retrieveBuildingIdFromCourseId(course_id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>(
                "SELECT building_id FROM course WHERE course_id = ?",
                [course_id],
                (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (res.length === 0) {
                            reject(new Error("No building_id found for the given course_id"));
                        } else {
                            const building_id: string = res[0].building_id;
                            resolve(building_id);
                        }
                    }
                }
            );
        });
    }

    retrieveBuildingFromCourseId(course_id: number): Promise<Building[]> {
        return new Promise((resolve, reject) => {
            connection.query<Building[]>(
                "SELECT * FROM course WHERE course_id = ?",
                [course_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            );
        });
    }



    update(building: Building): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "UPDATE building SET building_name = ?, school = ? WHERE building_id = ?",
                [building.building_name, building.school, building.building_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res.affectedRows);
                }
            );
        });
    }

    delete(building_id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "DELETE FROM building WHERE building_id = ?",
                [building_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res.affectedRows);
                }
            );
        });
    }


}

export default new BuildingRepository();