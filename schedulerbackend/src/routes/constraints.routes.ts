import { Router } from "express";
import ScheduletablesController from "../controllers/scheduletables.controller";
import ConstraintsController from "../controllers/constraints.controller";

class ConstraintsRoutes {
    router = Router();
    controller = new ConstraintsController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/constraints/:schedule_id", this.controller.getConstraintsByScheduleId);
        this.router.get("/moduleorder/:constraints_id", this.controller.getModuleOrderByConstraintsId);
        this.router.get("/classorder/:constraints_id", this.controller.getClassOrderByConstraintsId);
    }
}

export default new ConstraintsRoutes().router;
