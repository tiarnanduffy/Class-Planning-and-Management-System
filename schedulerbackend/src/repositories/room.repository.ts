import { OkPacket } from "mysql2";
import connection from "../db";
import Room from "../models/room.model";

interface IRoomRepository {
    create(room: Room): Promise<Room>;
    retrieveAll(): Promise<Room[]>;
    retrieveByRoomId(room_id: number): Promise<Room>;
    retrieveRoomsByBuildingId(building_id: number): Promise<Room[]>;
    retrieveRoomsJoin(building_id: number): Promise<Room[]>;
    update(room: Room): Promise<number>;
    delete(room_id: number): Promise<number>;
}

class RoomRepository implements IRoomRepository {

    create(room: Room): Promise<Room> {
        return new Promise((resolve, reject) => {
          connection.query<OkPacket>(
            "INSERT INTO timetable VALUES ();",
            [],
            (err, res) => {
              if (err) reject(err);
              else {
                connection.query<OkPacket>("INSERT INTO room (room_name, building_id, capacity, facility, timetable_id) VALUES(?,?,?,?,?);",
                  [room.room_name, room.building_id, room.capacity, room.facility, res.insertId],
                  (err, res) => {
                    if (err) reject(err);
                    else {
                      this.retrieveByRoomId(res.insertId).then((room) => resolve(room!)).catch(reject);
                    }
                  }
                )
              }
            }
          );
        });
      }

    retrieveAll(): Promise<Room[]> {
        return new Promise((resolve, reject) => {
            connection.query<Room[]>(
                "SELECT * FROM room",
                (err, res) => {
                  if(err) reject(err);
                  else resolve(res);
                }
            );
        });
    }

    retrieveByRoomId(room_id: number): Promise<Room> {
        return new Promise((resolve, reject) => {
          connection.query<Room[]>(
            "SELECT * FROM room WHERE room_id = ?",
            [room_id],
            (err, res) => {
              if (err) reject(err);
              else resolve(res?.[0]);
            }
          );
        });
      }

    retrieveRoomsByBuildingId(building_id: number): Promise<Room[]> {
        return new Promise((resolve, reject) => {
            connection.query<Room[]>(
                "SELECT * FROM room WHERE building_id = ?",
                [building_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            )
        })
    }

    retrieveRoomsJoin(building_id: number): Promise<Room[]> {
        return new Promise((resolve, reject) => {
            connection.query<Room[]>(
                "SELECT * FROM room WHERE building_id = ?",
                [building_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            )
        })
    }

    update(room: Room): Promise<number> {
        return new Promise((resolve, reject) => {
          connection.query<OkPacket>(
            "UPDATE room SET room_name = ?, building_id = ?, capacity = ?, facility = ? WHERE room_id = ?",
            [room.room_name, room.building_id, room.capacity, room.facility, room.room_id],
            (err, res) => {
              if (err) {
                console.error("Error updating room:", err);
                reject(err);
              }
              else {
                resolve(res.affectedRows);
              }
    
            }
          );
        });
      }

      delete(room_id: number): Promise<number> {
        return new Promise((resolve, reject) => {
          connection.query<OkPacket>(
            "DELETE FROM room WHERE room_id = ?",
            [room_id],
            (err, res) => {
              if (err) reject(err);
              else resolve(res.affectedRows);
            }
          );
        });
      }

}

export default new RoomRepository();