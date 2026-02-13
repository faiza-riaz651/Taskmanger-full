import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dueDate: { type: Date, required: true },
  description: { type: String },
  priority: {
    type: String,
    enum: ["Extreme", "Moderate", "Low"],
    required: true,
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  owner: { type: Schema.Types.ObjectId, ref: "Users" },
  status: {
    type: String,
    enum: ["Completed", "In Progress", "Not Started"],
    default: "Not Started",
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
