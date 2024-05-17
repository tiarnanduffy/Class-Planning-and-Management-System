import { Router } from "express";
import TimetableController from "../controllers/timetable.controller"

class TimetableRoutes {
    router = Router();
    controller = new TimetableController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", this.controller.retrieveAll);
        this.router.get("/:timetable_id", this.controller.retrieveByTimetableId);
        this.router.get("/", this.controller.retrieveModuleTimetables);
        this.router.put("/reset/", this.controller.resetTimetables);
        this.router.put("/:slot", this.controller.updateTimetableSlot);
        
    }
}

export default new TimetableRoutes().router;