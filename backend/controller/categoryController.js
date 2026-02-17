import Category from "../models/categoryModel.js";
import mongoose from "mongoose";
const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    console.log(req.user._id);
    const category = await Category.create({
      name: name,
      user: new mongoose.Types.ObjectId(req.user._id),
    });
    if (!category) {
      return res.status(500).json({ message: "Creation operatin failed!" });
    }
    return res.status(201).send(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const allCategorysByUser = async (req, res, next) => {
  try {
    let pageNo = Number(req.query.pageNo) || 0;
    console.log(req.user._id);
    const allCategory = await Category.find({
      user: req.user._id,
    })
      .populate("user", "email")
      .skip(pageNo * 5)
      .limit(5);

    return res.status(200).send(allCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const catToDlt = await Category.findOneAndDelete({ _id: id });
    if (!catToDlt) {
      return res.status(500).json({ message: "Error while delete operation" });
    }
    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const allCat = async (req, res, next) => {
  try {
    const allCategory = await Category.find({
      user: req.user._id,
    }).populate("user", "email");

    return res.status(200).send(allCategory);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createCategory, allCategorysByUser, deleteCategory, allCat };
