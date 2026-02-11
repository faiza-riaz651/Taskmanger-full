import mongoose from "mongoose";
import Task from "./taskModel.js";
const { Schema } = mongoose;
const categorySchema = new Schema({
  name: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: "Users" },
});

categorySchema.pre("findOneAndDelete", async function (next) {
  const category = this.getFilter();
  await Task.deleteMany({ category: category._id });
  // next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
