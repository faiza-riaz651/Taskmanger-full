import {
  createTask,
  deleteTask,
  getAllTasksByUser,
  getTasks,
  updateTask,
} from "../controller/taskController.js";
import express from "express";
import { isAuthenticated } from "../middleware/userAuth.js";
const taskRouter = express.Router();

taskRouter.route("/").post(isAuthenticated, createTask);
taskRouter.route("/all-tasks").get(isAuthenticated, getAllTasksByUser);
taskRouter.route("/paged-tasks").get(isAuthenticated, getTasks);
taskRouter.route("/task/:id").delete(isAuthenticated, deleteTask);
taskRouter.route("/update/:id").patch(isAuthenticated, updateTask);
export default taskRouter;
