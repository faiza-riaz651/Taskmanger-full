import Task from "../models/taskModel.js";
import mongoose from "mongoose";

const createTask = async (req, res, next) => {
  try {
    const { name, category, dueDate, description, priority, status } = req.body;
    const owner = req.user._id;
    console.log(req.user);
    console.log(owner);
    const task = await Task.create({
      name: name,
      category: category,
      dueDate: dueDate,
      description: description,
      priority: priority,
      owner: owner,
      status: status,
    });

    return res.status(201).send(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllTasksByUser = async (req, res, next) => {
  try {
    const allTasks = await Task.find({
      owner: new mongoose.Types.ObjectId(req.user._id),
    });

    if (!allTasks) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).send(allTasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res, next) => {
  try {
    const pageNo = Number(req.query.pageNo);
    const vitalTask = await Task.find({
      owner: new mongoose.Types.ObjectId(req.user._id),
    })
      .skip(5 * pageNo)
      .limit(5);
    if (!vitalTask) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).send(vitalTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskToDlt = await Task.findByIdAndDelete(id);
    if (!taskToDlt) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res
      .status(200)
      .json({ message: `Task ${taskToDlt.name} is deleted!` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const updateObj = {};
    for (let i = 0; i < keys.length; i++) {
      updateObj[keys[i]] = values[i];
    }

    const update = await Task.findByIdAndUpdate(id, updateObj, { new: true });
    return res.status(200).send(update);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).send(task);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getVitalTasks = async (req, res, next) => {
  try {
    const pageNo = Number(req.query.pageNo) || 0;
    const vitalTask = await Task.find({
      priority: "Extreme",
      owner: new mongoose.Types.ObjectId(req.user._id),
    })
      .skip(pageNo * 5)
      .limit(5);
    if (!vitalTask) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).send(vitalTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTaskApproachingDeadline = async (req, res, next) => {
  try {
    const tasks = await Task.find({
      owner: new mongoose.Types.ObjectId(req.user._id),
    })
      .sort({ dueDate: 1 })
      .limit(2);
    if (!tasks) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getTaskByCat = async (req, res) => {
  try {
    const { category } = req.params;

    const pageNo = Number(req.query.pageNo) || 0;
    const tasks = await Task.find({
      category: category,
      owner: new mongoose.Types.ObjectId(req.user._id),
    })
      .populate("category", "name")
      .skip(5 * pageNo)
      .limit(5);

    if (!tasks) {
      return res.status(404).json({ message: "suvusdbvusdbvusbd" });
    }
    return res.status(200).send(tasks);
  } catch (error) {
    console.log("not hitting");
    return res.status(500).json({ message: error.message });
  }
};

export {
  createTask,
  getAllTasksByUser,
  getTasks,
  deleteTask,
  updateTask,
  getTaskById,
  getVitalTasks,
  getTaskApproachingDeadline,
  getTaskByCat,
};
