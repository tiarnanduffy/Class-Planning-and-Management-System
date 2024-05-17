import connection from "../db";
import Room from "../models/room.model";
import Module from "../models/module.model";
import Timetable from "../models/timetable.model";
import StudentTimetable from "../models/studenttimetable.model";

interface IScheduleRepository {
    retrieveRoomsByCapacity(capacity: number, building_id: number): Promise<Room[]>;
    retrieveModulesOrderedByStudentsEnrolled(course_id: number): Promise<Module[]>;
    retrieveRegisteredStudentTimetables(module_id: number): Promise<Timetable[]>;
    retrieveRoomsByFacilityMatch(facility: string, building_id: number): Promise<Room[]>;
    
}

class ScheduleRepository implements IScheduleRepository {
    retrieveRoomsByCapacity(capacity: number, building_id: number): Promise<Room[]> {
        return new Promise((resolve, reject) => {
            connection.query<Room[]>(
                "SELECT * FROM room WHERE capacity >= ? AND building_id = ?",
                [capacity, building_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            )
        })
    }

    retrieveRoomsByFacilityMatch(facility: string, building_id: number): Promise<Room[]> {
        return new Promise((resolve, reject) => {
            connection.query<Room[]>(
                "SELECT * FROM room WHERE facility = ? AND building_id = ? ORDER BY capacity DESC",
                [facility, building_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            )
        })
    }

    retrieveModulesOrderedByStudentsEnrolled(course_id: number): Promise<Module[]> {
        return new Promise((resolve, reject) => {
          connection.query<Module[]>(
            "SELECT * FROM module WHERE course_id = ? ORDER BY enrolled_students desc",
            [course_id],
            (err, res) => {
              if (err) reject(err);
              else resolve(res);
            }
          );
        });
    }

    retrieveRegisteredStudentTimetables(module_id: number): Promise<StudentTimetable[]> {
        return new Promise((resolve, reject) => {
            connection.query<StudentTimetable[]>(
                " SELECT unified_user.user_id, timetable.*\
                  FROM modules_to_studentusers, unified_user, timetable\
                  WHERE unified_user.user_type = 'student'\
                  AND modules_to_studentusers.module_id = ?\
                  AND modules_to_studentusers.user_id = unified_user.user_id\
                  AND unified_user.timetable_id = timetable.timetable_id",
                [module_id],
                (err, res) => {
                    if (err) reject(err);
                    else resolve(res);
                }
            )
        })

    }

}

export default new ScheduleRepository();