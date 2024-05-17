import { Request, Response } from "express";
import roomRepository from "../repositories/room.repository";
import Room from "../models/room.model";
import { log } from "console";

export default class RoomController {

  async create(req: Request, res: Response) {
    if (!req.body.room_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const room: Room = req.body;
      const savedRoom = await roomRepository.create(room);

      res.status(201).send(savedRoom);
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
      const rooms = await roomRepository.retrieveAll();

      res.status(200).send(rooms);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving buildings.",
      });
    }
  }

  async getByRoomID(req: Request, res: Response) {
    const room_id: number = parseInt(req.params.room_id);

    try {
      const room = await roomRepository.retrieveByRoomId(room_id);

      if (room) res.status(200).send(room);
      else
        res.status(404).send({
          message: `Cannot find Room with room_id=${room_id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Room with room_id=${room_id}.`
      });
    }
  }

  async retrieveRoomsByBuildingId(req: Request, res: Response) {
    const building_id: number = parseInt(req.params.building_id);

    try {
      const room = await roomRepository.retrieveRoomsByBuildingId(building_id);

      if (room) res.status(200).send(room);
      else
        res.status(404).send({
          message: `Cannot find room with building_id=${building_id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving room with building_id=${building_id}.`
      });

    }
  }

  async update(req: Request, res: Response) {
    let room: Room = req.body;
    room.room_id = parseInt(req.params.room_id);

    try {
      const num = await roomRepository.update(room);

      if (num == 1) {
        res.send({
          message: "Room was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Room with room_id=${room.room_id}. Maybe Room was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Room with room_id=${room.room_id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const room_id: number = parseInt(req.params.room_id);

    try {
      const num = await roomRepository.delete(room_id);

      if (num == 1) {
        res.send({
          message: "Room was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Room with room_id=${room_id}. Maybe Room was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Room with id==${room_id}.`
      });
    }
  }


}