import { Router } from "express";
import PendingController from "../controllers/pending.controller";

class PendingRoutes {
    router = Router();
    controller = new PendingController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.put("/:pending_id", this.controller.addPending);
    }
}

export default new PendingRoutes().router;
