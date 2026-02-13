import {
  createTask,
  deleteTask,
  getAllTasksByUser,
  getTasks,
  updateTask,
  getTaskById,
  getVitalTasks,
} from "../controller/taskController.js";
import express from "express";
import { isAuthenticated } from "../middleware/userAuth.js";
const taskRouter = express.Router();

taskRouter.route("/").post(isAuthenticated, createTask);
taskRouter.route("/vital-task").get(isAuthenticated, getVitalTasks);
taskRouter.route("/paged-tasks").get(isAuthenticated, getTasks);
taskRouter
  .route("/task/:id")
  .delete(isAuthenticated, deleteTask)
  .get(isAuthenticated, getTaskById)
  .patch(isAuthenticated, updateTask);

export default taskRouter;
