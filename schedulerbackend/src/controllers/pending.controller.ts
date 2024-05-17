import { Request, Response } from "express";
import pendingRepository from "../repositories/pending.repository";
import Pending from "../models/pending.model";
import { log } from "console";

export default class PendingController {
    async addPending(req: Request, res: Response) {
        if (!req.body.pending_list) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
          return;
        }
    
        try {
          const pending_id: number = req.body.pending_id;
          const pending_list: string = req.body.pending_list;
          const savedPending = await pendingRepository.addPending(pending_list, pending_id);
    
          res.status(201).send(savedPending);
        } catch (err) {
          log(typeof err);
          res.status(500).send({
            message: "ERROR: " + err
          });
          log(err);
        }
      }


      async setAllPendingNull(req: Request, res: Response) {
        try {
          const result = await pendingRepository.setAllPendingNull();
    
          if(result) {
            res.status(200).send({
              message: "All pending_list set to null."
            });
          } else {
            res.status(500).send({
              message: "Failed to set all pending_list to null."
            });
          }
        } catch (err) {
          console.error("Error setting all pending_list to null:", err);
          res.status(500).send({
            message: "Internal server error while setting setting all pending_list to null."
          });
        }
      }
}