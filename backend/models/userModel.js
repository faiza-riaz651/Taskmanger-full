import mongoose from "mongoose";
import Category from "./categoryModel.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 4 },
    phoneNo: { type: Number, required: true, min: 6 },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

userSchema.pre("findOneAndDelete", async function (next) {
  const user = this.getFilter();

  await Category.deleteMany({ user: user._id });
});

const users = mongoose.model("Users", userSchema);

export { users };
