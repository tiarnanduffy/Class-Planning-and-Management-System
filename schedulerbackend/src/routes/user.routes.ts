import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {
    router = Router();
    controller = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/student", this.controller.createStudent);
        this.router.post("/lecturer", this.controller.createLecturer);
        this.router.get("/student/", this.controller.retrieveStudents);
        this.router.get("/lecturer/", this.controller.retrieveLecturers);
        this.router.get("/:user_id", this.controller.getByUserID);
        this.router.put("/:user_id", this.controller.update);
        this.router.delete("/:user_id", this.controller.delete)
    }
}

export default new UserRoutes().router;