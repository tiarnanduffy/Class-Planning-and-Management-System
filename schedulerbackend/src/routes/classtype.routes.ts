import { Router } from "express";
import ClasstypeController from "../controllers/classtype.controller";

class ClasstypeRoutes {
    router = Router();
    controller = new ClasstypeController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/", this.controller.create);
        this.router.get("/", this.controller.retrieveAll);
        this.router.get("/:classtype_id", this.controller.getByClasstypeID);
        this.router.get("/module_id/:module_id", this.controller.getByModuleID);
        this.router.put("/:classtype_id", this.controller.update);
    }
}

export default new ClasstypeRoutes().router;