import { Application } from "express";
import courseRoutes from "./course.routes";
import scheduleRoutes from "./schedule.routes";
import buildingRoutes from "./building.routes";
import moduleRoutes from "./module.routes";
import timetableRoutes from "./timetable.routes";
import roomRoutes from "./room.routes";
import userRoutes from "./user.routes";
import modulestostudentusersRoutes from "./modulestostudentusers.routes";
import classtypeRoutes from "./classtype.routes";
import pendingRoutes from "./pending.routes";
import scheduletablesRoutes from "./scheduletables.routes";
import constraintsRoutes from "./constraints.routes";

export default class Routes {
  constructor(app: Application) {

    app.use("/api/course", courseRoutes);
    app.use("/api/schedule", scheduleRoutes);
    app.use("/api/building", buildingRoutes);
    app.use("/api/module", moduleRoutes);
    app.use("/api/timetable", timetableRoutes);
    app.use("/api/moduleTimetables", timetableRoutes);
    app.use("/api/room", roomRoutes);
    app.use("/api/user", userRoutes);
    app.use("/api/modulesToStudentUsers", modulestostudentusersRoutes);
    app.use("/api/classtype", classtypeRoutes);
    app.use("/api/pending", pendingRoutes);
    app.use("/api/scheduletables", scheduletablesRoutes);
    app.use("/api/constraints", constraintsRoutes);
  }
}

