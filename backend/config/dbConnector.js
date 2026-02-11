import mongoose from "mongoose";

export const connectDb = async (db_path) => {
  try {
    const db = await mongoose.connect(db_path);
    console.log(`successfully connected to DB`);
    return db;
  } catch (error) {
    console.log(`error occured while connecting to dn ${error.message}`);
    process.exit(1);
  }
};
