import { Request, Response } from "express";

import moduleRepository from "../repositories/module.repository";
import { log } from "console";
import Module from "../models/module.model";

export default class ModuleController {

  async create(req: Request, res: Response) {
    if (!req.body.course_id) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const module: Module = req.body;
      const savedModule = await moduleRepository.create(module);

      res.status(201).send(savedModule);
    } catch (err) {
      log(typeof err);
      res.status(500).send({
        message: "ERROR: " + err
      });
      log(err);
    }
  }

  async create2(req: Request, res: Response) {
    try {
      const moduleAndClass = req.body;
      const savedModuleAndClasstype = await moduleRepository.create2(moduleAndClass.module, moduleAndClass.classtype);
      res.status(201).send(savedModuleAndClasstype);
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "ERROR: " + err
      });
    }
  }

  async retrieveAll(req: Request, res: Response) {
    try {
      const modules = await moduleRepository.retrieveAll();

      res.status(200).send(modules);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving courses.",
      });
    }
  }

  async getByModuleID(req: Request, res: Response) {
    const module_id: number = parseInt(req.params.module_id);

    try {
      const module = await moduleRepository.retrieveById(module_id);

      if (module) res.status(200).send(module);
      else
        res.status(404).send({
          message: `Cannot find Module with module_id=${module_id}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Module with course_id=${module_id}.`
      });
    }
  }

  async getByCourseId(req: Request, res: Response) {
    const course_id: number = parseInt(req.params.course_id);

    try {
      const modules = await moduleRepository.retrieveByCourseId(course_id);

      if (modules) {
        res.status(200).send(modules);
      } else {
        res.status(404).send({
          message: `Cannot find Modules with course_id=${course_id}.`
        });
      }

    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Modules with course_id=${course_id}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let module: Module = req.body;
    module.module_id = parseInt(req.params.module_id);

    try {
      const num = await moduleRepository.update(module);

      if (num == 1) {
        res.send({
          message: "Module was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Module with module_id=${module.module_id}. Maybe Module was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Module with module_id=${module.module_id}.`
      });
    }
  }

  async update2(req: Request, res: Response) {
    const moduleAndClass = req.body;

    let module: Module = moduleAndClass.module;
    module.module_id = parseInt(req.params.module_id);
    
    try {
      const num = await moduleRepository.update2(moduleAndClass.module, moduleAndClass.classtype);

      if (num == 1) {
        res.send({
          message: "Module and Classtype were updated successfully.",
          data: {
            module: moduleAndClass.module,
            classtype: moduleAndClass.classtype
          }
        });
      } else {
        res.send({
          message: `Cannot update Module or Classtype. Maybe one or both were not found or req.body is empty!`,
          data: {
            module: moduleAndClass.module,
            classtype: moduleAndClass.classtype
          }
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Module and/or Classtype.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const module_id: number = parseInt(req.params.module_id);

    try {
      const num = await moduleRepository.delete(module_id);

      if (num == 1) {
        res.send({
          message: "Module was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Module with module_id=${module_id}. Maybe Module was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Module with id==${module_id}.`
      });
    }
  }

}

