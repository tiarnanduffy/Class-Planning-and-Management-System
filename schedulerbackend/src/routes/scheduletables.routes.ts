import { Router } from "express";
import ScheduletablesController from "../controllers/scheduletables.controller";

class ScheduletablesRoutes {
    router = Router();
    controller = new ScheduletablesController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/succeeded/:schedule_id", this.controller.getSuccededByScheduleId);
        this.router.get("/failed/:schedule_id", this.controller.getFailedByScheduleId);
        this.router.get("/suggestion/:schedule_id", this.controller.getSuggestionByScheduleId);
        this.router.get("/reason/:schedule_id", this.controller.getReasonByScheduleId);
        this.router.get("/schedule/:schedule_id", this.controller.getScheduleById);
        this.router.get("/schedule/", this.controller.getScheduleRows);
    }
}

export default new ScheduletablesRoutes().router;
