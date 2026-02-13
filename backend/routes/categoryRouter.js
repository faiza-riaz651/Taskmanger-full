import {
  createCategory,
  allCategorysByUser,
  deleteCategory,
  allCat,
} from "../controller/categoryController.js";
import express from "express";
import { isAuthenticated } from "../middleware/userAuth.js";

const categoryRouter = express.Router();

categoryRouter.route("/").post(isAuthenticated, createCategory);
categoryRouter.route("/all-category").get(isAuthenticated, allCategorysByUser);
categoryRouter.route("/allCat").get(isAuthenticated, allCat);
categoryRouter.route("/category/:id").delete(isAuthenticated, deleteCategory);

export default categoryRouter;
