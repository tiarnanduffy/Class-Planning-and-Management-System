import { Request, Response } from "express";
import userRepository from "../repositories/user.repository";
import User from "../models/user.model";
import { log } from "console";

export default class UserController {

  async getByUserID(req: Request, res: Response) {
    const user_id: number = parseInt(req.params.user_id);

    try {
      const user = await userRepository.retrieveByUserId(user_id);

      if (user) res.status(200).send(user);
      else
        res.status(404).send({
          message: `Cannot find User with user_id=${user_id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving User with user_id=${user_id}.`
      });
    }
  }

  async createStudent(req: Request, res: Response) {
    if (!req.body.firstname) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const user: User = req.body;
      const savedUser = await userRepository.createStudent(user);

      res.status(201).send(savedUser);
    } catch (err) {
      log(typeof err);
      res.status(500).send({
        message: "ERROR: " + err
      });
      log(err);
    }
  }

  async createLecturer(req: Request, res: Response) {
    if (!req.body.firstname) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const user: User = req.body;
      const savedUser = await userRepository.createLecturer(user);

      res.status(201).send(savedUser);
    } catch (err) {
      log(typeof err);
      res.status(500).send({
        message: "ERROR: " + err
      });
      log(err);
    }
  }

  async retrieveStudents(req: Request, res: Response) {
    try {
      const students = await userRepository.retrieveStudents();

      res.status(200).send(students);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving students from unified_users.",
      });
    }

  }

  async retrieveLecturers(req: Request, res: Response) {
    try {
      const students = await userRepository.retrieveLecturers();

      res.status(200).send(students);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving lecturers from unified_users.",
      });
    }

  }

  async update(req: Request, res: Response) {
    let user: User = req.body;
    user.user_id = parseInt(req.params.user_id);
    try {
      const num = await userRepository.update(user);

      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with user_id=${user.user_id}. Maybe User was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating User with user_id=${user.user_id}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const user_id: number = parseInt(req.params.user_id);

    try {
      const num = await userRepository.delete(user_id);

      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with user_id=${user_id}. Maybe User was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete User with id==${user_id}.`
      });
    }
  }




}

