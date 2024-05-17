import { Router } from "express";
import ModulesToStudentUsersController from "../controllers/modulestostudentusers.controller";

class ModulesToStudentUsersRoutes {
    router = Router();
    controller = new ModulesToStudentUsersController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/", this.controller.create);
        this.router.get("/:user_id", this.controller.retrieveModulesByStudentUserId)
    }
}

export default new ModulesToStudentUsersRoutes().router;