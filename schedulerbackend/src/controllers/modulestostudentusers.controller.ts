import { Request, Response } from "express";
import ModulesToStudentUsers from "../models/module.model";
import modulesToStudentUsersRepository from "../repositories/modulestostudentusers.repository";
import { log } from "console";

export default class ModulesToStudentUsersController {

    async create(req: Request, res: Response) {
        if (!req.body.module_ids || !req.body.user_id) {
            res.status(400).send({
                message: "Both module_id and user_id must be provided"
            });
            return;
        }

        try {

            const { module_ids, user_id } = req.body;
            module_ids.forEach(async (element: number) => {
                await modulesToStudentUsersRepository.create(element, user_id);
            });
            res.status(201).send({ message: "module-to-student relationship created successfully" });
        } catch (err) {
            log(typeof err);
            res.status(500).send({
                message: "ERROR: " + err
            });
        }
    }


    async retrieveModulesByStudentUserId(req: Request, res: Response) {
        const user_id = parseInt(req.params.user_id);

        try {
            const module_id = await modulesToStudentUsersRepository.retrieveModulesByStudentUserId(user_id);

            if (module_id) res.status(200).send(module_id);
            else
                res.status(404).send({
                    message: `Cannot find module_ids with user_id=${user_id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving room with user_id=${user_id}.`
            });
        }
    }


}

