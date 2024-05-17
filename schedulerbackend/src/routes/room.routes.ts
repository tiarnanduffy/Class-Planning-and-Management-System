import { Router } from "express";
import RoomController from "../controllers/room.controller";

class RoomRoutes {
    router = Router();
    controller = new RoomController();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post("/", this.controller.create);
        this.router.get("/", this.controller.retrieveAll);
        this.router.get("/:room_id", this.controller.getByRoomID);
        this.router.get("/building/:building_id", this.controller.retrieveRoomsByBuildingId);
        this.router.put("/:room_id", this.controller.update);
        this.router.delete("/:room_id", this.controller.delete);
    }
}

export default new RoomRoutes().router;