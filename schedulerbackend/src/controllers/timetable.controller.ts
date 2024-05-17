import { Request, Response } from "express";
import timetableRepository from "../repositories/timetable.repository";
import moduleRepository from "../repositories/module.repository";
import Timetable from "../models/timetable.model";
import { log } from "console";

export default class TimetableController {

  async retrieveAll(req: Request, res: Response) {
    try {
      const timetables = await timetableRepository.retrieveAll();

      res.status(200).send(timetables);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving timetables.",
      });
    }
  }

  async retrieveByTimetableId(req: Request, res: Response) {
    const timetable_id: number = parseInt(req.params.timetable_id);

    try {
      const timetable = await timetableRepository.retrieveByTimetableId(timetable_id);

      if (timetable) {
        res.status(200).send(timetable);
      } else {
        res.status(404).send({
          message: `Cannot find Timetable with timetable_id=${timetable_id}.`
        });
      }

    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Timetable with timetable_id=${timetable_id}.`
      });
    }
  }

  async resetTimetables(req: Request, res: Response) {
    try {
      const result = await timetableRepository.resetTimetables();

      if (result) {
        res.status(200).send({
          message: "Timetables were reset successfully."
        });
      } else {
        res.status(500).send({
          message: "Failed to reset timetables."
        });
      }
    } catch (err) {
      console.error("Error resetting timetables:", err);
      res.status(500).send({
        message: "Internal server error while resetting timetables."
      });
    }
  }

  async retrieveModuleTimetables(req: Request, res: Response) {
    try {
      const moduleTimetables = await timetableRepository.retrieveModuleTimetables();

      res.status(200).send(moduleTimetables);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving module timetables.",
      });
    }
  }

  async updateTimetableSlot(req: Request, res: Response) {

    let s = req.params.slot.split("_")
    let timetable_id: number = parseInt(s[0]);
    let slot: string = s[1]
    let  module_name: string = req.params.module_name;

    try {
      const num = await timetableRepository.updateTimetableSlot(timetable_id, slot, "reserved");

      if (num == 1) {
        res.send({
          message: "Lecturer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Timetable with timetable_id=${timetable_id}. Maybe Timetable was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Timetable with timetable_id=${timetable_id}.`
      });
    }

  }



  
}
