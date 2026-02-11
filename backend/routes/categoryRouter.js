import {
  createCategory,
  allCategorysByUser,
  deleteCategory,
} from "../controller/categoryController.js";
import express from "express";
import { isAuthenticated } from "../middleware/userAuth.js";

const categoryRouter = express.Router();

categoryRouter.route("/").post(isAuthenticated, createCategory);
categoryRouter.route("/all-category").get(isAuthenticated, allCategorysByUser);
categoryRouter.route("/category/:id").delete(isAuthenticated, deleteCategory);

export default categoryRouter;
