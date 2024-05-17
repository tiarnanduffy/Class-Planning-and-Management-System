
import { OkPacket, RowDataPacket } from "mysql2";
import connection from "../db";

interface IPendingRepository {
    addPending(pending_list: string | null, pending_id: number): Promise<number>;
    setAllPendingNull(): Promise<number>;
    retrievePendingString(pending_id: number): Promise<string>;
}

class PendingRepository implements IPendingRepository {

    addPending(pending_list: string | null, pending_id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query<OkPacket>(
                "UPDATE pending SET pending_list = ? WHERE pending_id = ?;",
                [pending_list, pending_id],
                (err, res) => {
                    if (err) {
                        console.error("Error adding/updating pending: ", err);
                        reject(err);
                    }
                    else {
                        resolve(res.affectedRows);

                    }
                }
            );
        });
    }

    setAllPendingNull(): Promise<number> {
        return new Promise((resolve, reject) => {
          connection.query<OkPacket>(
            "UPDATE pending SET pending_list = null;",
            (err, res) => {
              if (err) {
                reject(err);
              } 
              else resolve(res.affectedRows);
            }
          )
        })
    }

    retrievePendingString(pending_id: number): Promise<string> {
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>(
                "SELECT pending_list FROM pending WHERE pending_id = ?",
                [pending_id],
                (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (rows.length === 0) {
                            reject(new Error("No pending record found for the given ID"));
                        } else {
                            const pendingList: string = rows[0].pending_list;
                            resolve(pendingList);
                        }
                    }
                }
            );
        });
    }
}

export default new PendingRepository();