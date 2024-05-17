import { Request, Response } from "express";
import constraintsRepository from "../repositories/constraints.repository";
import { log } from "console";

export default class ConstraintsController {
    async getConstraintsByScheduleId(req: Request, res: Response) {
        const schedule_id: number = parseInt(req.params.schedule_id);
        try {
            const row = await constraintsRepository.getConstraintsByScheduleId(schedule_id);
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

    async getModuleOrderByConstraintsId(req: Request, res: Response) {
        const constraints_id: number = parseInt(req.params.constraints_id);
        try {
            const row = await constraintsRepository.getModuleOrderByConstraintsId(constraints_id);
            if (row) res.status(200).send(row);
            else
                res.status(404).send({
                    message: `Cannot find with constraints_id=${constraints_id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving with constraints_id=${constraints_id}.`
            });
        }
    }

    async getClassOrderByConstraintsId(req: Request, res: Response) {
        const constraints_id: number = parseInt(req.params.constraints_id);
        try {
            const row = await constraintsRepository.getClassOrderByConstraintsId(constraints_id);
            if (row) res.status(200).send(row);
            else
                res.status(404).send({
                    message: `Cannot find with constraints_id=${constraints_id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving with constraints_id=${constraints_id}.`
            });
        }
    }


}
