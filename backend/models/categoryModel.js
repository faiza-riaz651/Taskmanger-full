import mongoose from "mongoose";
import Task from "./taskModel.js";
const { Schema } = mongoose;
const categorySchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
});

categorySchema.pre("findOneAndDelete", async function () {
  const category = this.getFilter();
  await Task.deleteMany({ category: category._id });
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
