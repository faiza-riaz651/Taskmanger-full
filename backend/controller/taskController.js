import Task from "../models/taskModel.js";

const createTask = async (req, res, next) => {
  try {
    const { name, category, dueDate, description, priority, status } = req.body;
    const owner = req.user.id;

    const task = await Task.create({
      name: name,
      category: category,
      dueDate: dueDate,
      description: description,
      priority: priority,
      owner: owner,
      status: status,
    });

    if (!task) {
      return res.status(404).json({ message: "Not Found" });
    }

    return res.status(201).send(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllTasksByUser = async (req, res, next) => {
  try {
    const allTasks = await Task.find({ owner: req.user.id });

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
    const vitalTask = await Task.find({ owner: req.user.id })
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

export {
  createTask,
  getAllTasksByUser,
  getTasks,
  deleteTask,
  updateTask,
  getTaskById,
};
