import { Request, Response } from "express";
import scheduletablesRepository from "../repositories/scheduletables.repository";
import { log } from "console";

export default class ScheduletablesController {

    // Scheduletables contains logic for all outcome-required tables, rather than them all having separate classes

    async getSuccededByScheduleId(req: Request, res: Response) {
        const schedule_id: number = parseInt(req.params.schedule_id);
        try {
            const row = await scheduletablesRepository.getSuccededByScheduleId(schedule_id)
            if (row) res.status(200).send(row);
            else
                res.status(404).send({
                    message: `Cannot find with schedule_id=${schedule_id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving with schedule_id=${schedule_id}.`
            });
        }
    }

    async getFailedByScheduleId(req: Request, res: Response) {
        const schedule_id: number = parseInt(req.params.schedule_id);
        try {
            const row = await scheduletablesRepository.getFailedByScheduleId(schedule_id)
            if (row) res.status(200).send(row);
            else
                res.status(404).send({
                    message: `Cannot find with schedule_id=${schedule_id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving with schedule_id=${schedule_id}.`
            });
        }
    }

    async getSuggestionByScheduleId(req: Request, res: Response) {
        const schedule_id: number = parseInt(req.params.schedule_id);
        try {
            const row = await scheduletablesRepository.getSuggestionByScheduleId(schedule_id)
            if (row) res.status(200).send(row);
            else
                res.status(404).send({
                    message: `Cannot find with schedule_id=${schedule_id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving with schedule_id=${schedule_id}.`
            });
        }
    }

    async getReasonByScheduleId(req: Request, res: Response) {
        const schedule_id: number = parseInt(req.params.schedule_id);
        try {
            const row = await scheduletablesRepository.getReasonByScheduleId(schedule_id)
            if (row) res.status(200).send(row);
            else
                res.status(404).send({
                    message: `Cannot find with schedule_id=${schedule_id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving with schedule_id=${schedule_id}.`
            });
        }
    }

    async addFailed(req: Request, res: Response) {
        if (!req.body.schedule_id) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        try {
            const schedule_id: number = req.body.schedule_id;
            const module_id: number = req.body.module_id;
            const classtype: string = req.body.classtype;
            const class_num: string = req.body.class_num;
            const savedFailed = await scheduletablesRepository.addFailed(schedule_id, module_id, classtype, class_num);
            res.status(201).send(savedFailed);
        } catch (err) {
            log(typeof err);
            res.status(500).send({
                message: "ERROR: " + err
            });
            log(err);
        }
    }

    async addSuggestion(req: Request, res: Response) {
        if (!req.body.schedule_id) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        try {
            const schedule_id: number = req.body.schedule_id;
            const constraint: string = req.body.constraint;
            const slots: string = req.body.slots;
            const required_leeway: number = req.body.required_leeway;
            const savedSuggested = await scheduletablesRepository.addSuggestion(schedule_id, constraint, slots, required_leeway);

            res.status(201).send(savedSuggested);
        } catch (err) {
            log(typeof err);
            res.status(500).send({
                message: "ERROR: " + err
            });
            log(err);
        }
    }


    async addScheduleRow(req: Request, res: Response) {
        if (!req.body.datetime) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        try {
            const course_id: number = req.body;
            const savedScheduleRow = await scheduletablesRepository.addScheduleRow(course_id);

            res.status(201).send(savedScheduleRow);
        } catch (err) {
            log(typeof err);
            res.status(500).send({
                message: "ERROR: " + err
            });
            log(err);
        }
    }



    async addSucceeded(req: Request, res: Response) {
        if (!req.body.schedule_id) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        try {
            const schedule_id: number = req.body.schedule_id;
            const module_id: number = req.body.module_id;
            const user_id: number = req.body.user_id;
            const room_id: number = req.body.room_id;
            const classtype: string = req.body.classtype;
            const slot: string = req.body.slot;
            const savedSucceeded = await scheduletablesRepository.addSucceeded(schedule_id, module_id, user_id, room_id, classtype, slot)

            res.status(201).send(savedSucceeded);
        } catch (err) {
            log(typeof err);
            res.status(500).send({
                message: "ERROR: " + err
            });
            log(err);
        }
    }

    async getScheduleById(req: Request, res: Response) {
        const schedule_id: number = parseInt(req.params.schedule_id);

        try {
          const schedule = await scheduletablesRepository.getScheduleById(schedule_id);
    
          if (schedule) res.status(200).send(schedule);
          else
            res.status(404).send({
              message: `Cannot find schedule with schedule_id=${schedule_id}.`
            });
        } catch (err) {
          res.status(500).send({
            message: `Error retrieving schedule with schedule_id=${schedule_id}.`
          });
        }
    
    }

    async getScheduleRows(req: Request, res: Response) {
        try {
          const scheduleRows = await scheduletablesRepository.getScheduleRows();
    
          res.status(200).send(scheduleRows);
        } catch (err) {
          res.status(500).send({
            message: "Some error occurred while retrieving scheduleRows from schedule.",
          });
        }
    
      }
}