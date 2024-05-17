import { Request, Response } from "express";
import Course from "../models/course.model";
import courseRepository from "../repositories/course.repository";
import { log } from "console";


export default class CourseController {
  async create(req: Request, res: Response) {
    if (!req.body.course_name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const course: Course = req.body;
      const savedCourse = await courseRepository.save(course);

      res.status(201).send(savedCourse);
    } catch (err) {
      log(typeof err);
      res.status(500).send({
        message: "ERROR: " + err
      });
      log(err);
    }
  }

  // retrieveAll
  async findAll(req: Request, res: Response) {
    const course_name = typeof req.query.course_name === "string" ? req.query.course_name : "";

    try {
      const course = await courseRepository.retrieveAll({ course_name: course_name });

      res.status(200).send(course);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving courses.",
      });
    }
  }

  // retrieveById
  async findOne(req: Request, res: Response) {
    const course_id: number = parseInt(req.params.course_id);

    try {
      const course = await courseRepository.retrieveById(course_id);

      if (course) res.status(200).send(course);
      else
        res.status(404).send({
          message: `Cannot find Course with course_id=${course_id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Course with course_id=${course_id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let course: Course = req.body;
    course.course_id = parseInt(req.params.course_id);

    try {
      const num = await courseRepository.update(course);

      if (num == 1) {
        res.send({
          message: "Course was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Course with course_id=${course.course_id}. Maybe Course was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Course with course_id=${course.course_id}.`
      });
    }
  }

  async setScheduled(req: Request, res: Response) {
    if (!req.body.scheduled) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const course_id: number = req.body.course_id;
      const scheduled: boolean = req.body.scheduled;
      const savedScheduled = await courseRepository.setScheduled(scheduled, course_id);

      res.status(201).send(savedScheduled);
    } catch (err) {
      log(typeof err);
      res.status(500).send({
        message: "ERROR: " + err
      });
      log(err);
    }
  }

  async resetScheduled(req: Request, res: Response) {
    try {
      const result = await courseRepository.resetScheduled();

      if(result) {
        res.status(200).send({
          message: "Course set scheduled to false."
        });
      } else {
        res.status(500).send({
          message: "Failed to set courses scheduled to false."
        });
      }
    } catch (err) {
      console.error("Error setting scheduled to false:", err);
      res.status(500).send({
        message: "Internal server error while setting scheduled to false."
      });
    }
  }

  async delete(req: Request, res: Response) {
    const course_id: number = parseInt(req.params.course_id);

    try {
      const num = await courseRepository.delete(course_id);

      if (num == 1) {
        res.send({
          message: "Course was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Course with course_id=${course_id}. Maybe Course was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Course with id==${course_id}.`
      });
    }
  }
}