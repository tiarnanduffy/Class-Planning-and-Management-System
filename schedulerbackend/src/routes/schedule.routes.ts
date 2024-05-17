import { Router } from "express";
import ScheduleController from "../controllers/schedule.controller";

class ScheduleRoutes {
  router = Router();
  controller = new ScheduleController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/:course_id", this.controller.doSchedule);
  }
}

export default new ScheduleRoutes().router;