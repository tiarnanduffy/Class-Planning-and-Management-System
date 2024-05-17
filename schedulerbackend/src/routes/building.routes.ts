import { Router } from "express";
import BuildingController from "../controllers/building.controller";

class BuildingRoutes {
    router = Router();
    controller = new BuildingController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/", this.controller.create);
        this.router.get("/", this.controller.retrieveAll);
        this.router.get("/:building_id", this.controller.retrieveById);
        this.router.get("/course/:course_id", this.controller.retrieveBuildingIdFromCourseId);
        this.router.put("/:building_id", this.controller.update);
        this.router.delete("/:building_id", this.controller.delete);
    }
}

export default new BuildingRoutes().router;