import { Request, Response } from "express";
import buildingRepository from "../repositories/building.repository";
import Building from "../models/building.model";
import { log } from "console";

export default class BuildingController {

  async create(req: Request, res: Response) {
    if (!req.body.building_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const building: Building = req.body;
      const savedBuilding = await buildingRepository.create(building);

      res.status(201).send(savedBuilding);
    } catch (err) {
      log(typeof err);
      res.status(500).send({
        message: "ERROR: " + err
      });
      log(err);
    }
  }

  async retrieveAll(req: Request, res: Response) {
    try {
      const buildings = await buildingRepository.retrieveAll();

      res.status(200).send(buildings);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving buildings.",
      });
    }
  }

  async retrieveById(req: Request, res: Response) {
    const building_id: number = parseInt(req.params.building_id);

    try {
      const building = await buildingRepository.retrieveById(building_id);

      if (building) res.status(200).send(building);
      else
        res.status(404).send({
          message: `Cannot find Building with building_id=${building_id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Building with building_id=${building_id}.`
      });
    }


  }

  async retrieveBuildingIdFromCourseId(req: Request, res: Response) {
    const course_id: number = parseInt(req.params.course_id);
    try {
        const building_id = await buildingRepository.retrieveBuildingIdFromCourseId(course_id);

        if (building_id) {
            res.status(200).send(building_id.toString());
        } else {
          res.sendStatus(404);
        }
    } catch (err) {
        res.status(500).send({
            message: `Error retrieving building_id with course_id=${course_id}.`
        });
    }
}


  async update(req: Request, res: Response) {
    let building: Building = req.body;
    building.building_id = parseInt(req.params.building_id);

    try {
      const num = await buildingRepository.update(building);

      if (num == 1) {
        res.send({
          message: "Building was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Building with building_id=${building.building_id}. Maybe Building was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Building with building_id=${building.building_id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const building_id: number = parseInt(req.params.building_id);

    try {
      const num = await buildingRepository.delete(building_id);

      if (num == 1) {
        res.send({
          message: "Building was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Building with building_id=${building_id}. Maybe Building was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Building with id==${building_id}.`
      });
    }
  }

}