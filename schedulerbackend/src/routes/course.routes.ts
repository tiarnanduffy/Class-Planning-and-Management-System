import { Router } from "express";
import CourseController from "../controllers/course.controller";

class CourseRoutes {
  router = Router();
  controller = new CourseController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/", this.controller.create);
    this.router.get("/", this.controller.findAll);
    this.router.get("/:course_id", this.controller.findOne);
    this.router.put("/:course_id", this.controller.update);
    this.router.delete("/:course_id", this.controller.delete);

  }
}

export default new CourseRoutes().router;
