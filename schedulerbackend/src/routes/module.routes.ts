import { Router } from "express";
import ModuleController from "../controllers/module.controller";

class ModuleRoutes {
    router = Router();
    controller = new ModuleController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/createwithclass/", this.controller.create2)
        this.router.post("/", this.controller.create);
        this.router.get("/", this.controller.retrieveAll);
        this.router.get("/:module_id", this.controller.getByModuleID);
        this.router.get("/course/:course_id", this.controller.getByCourseId);
        this.router.put("/:module_id", this.controller.update);
        this.router.delete("/:module_id", this.controller.delete);
        this.router.put("/updatewithclass/:module_id", this.controller.update2);
    }
}

export default new ModuleRoutes().router;