import { Request, Response } from "express";
import Classtype from "../models/classtype.model"
import classtypeRepository from "../repositories/classtype.repository";
import { log } from "console";

export default class ClasstypeController {

    async create(req: Request, res: Response) {
        if (!req.body.num_lectures) {
            res.status(400).send({
                messgae: "Content can not be empty!"
            });
            return;
        }

        try {
            const classtype: Classtype = req.body;
            const savedClasstype = await classtypeRepository.create(classtype);

            res.status(201).send(savedClasstype);
        } catch (err) {
            log(typeof err);
            res.status(500).send({
                message: "ERROR: " + err
            });
            log(err);
        }
    }

    async getByClasstypeID(req: Request, res: Response) {
        const classtype_id: number = parseInt(req.params.classtype_id);

        try {
            const classtype = await classtypeRepository.retrieveById(classtype_id);

            if (classtype) res.status(200).send(classtype);
            else
                res.status(404).send({
                    message: `Cannot find Classtype with classtype_id=${classtype_id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving Classtype with classtype_id=${classtype_id}.`
            });
        }
    }

    async getByModuleID(req: Request, res: Response) {
        const module_id: number = parseInt(req.params.module_id);
        
        try {
            const classtype = await classtypeRepository.retrieveByModuleId(module_id);

            if (classtype) res.status(200).send(classtype);
            else
                res.status(404).send({
                    message: `Cannot find Classtype with module_id=${module_id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving Classtype with module_id=${module_id}.`
            });
        }
    }

    async retrieveAll(req: Request, res: Response) {
        try {
            const classtypes = await classtypeRepository.retrieveAll();

            res.status(200).send(classtypes);
        } catch (err) {
            res.status(500).send({
                message: "Some error occured while retrieving classtypes."
            });
        }
    }

    async update(req: Request, res: Response) {
        let classtype: Classtype = req.body;
        classtype.classtype_id = parseInt(req.params.classtype_id);

        try {
            const num = await classtypeRepository.update(classtype);

            if (num == 1) {
                res.send({
                    message: "Classtype was updated successfully.",
                    data: {
                        classtype
                    }
                    
                });
            } else {
                res.send({
                    message: `Cannot update Classtype with classtype_id=${classtype.classtype_id}. Maybe Classtype was not found or req.body was empty!`
                });
            }
        } catch(err) {
            res.status(500).send({
                message: `Error updating Classtype with classtype_id=${classtype.classtype_id}`
            });
        }
    }

}