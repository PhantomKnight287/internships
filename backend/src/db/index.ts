import mongoose from "mongoose";
import { MONGO_URI } from "../constants/index.js";

export const connection = await mongoose.connect(MONGO_URI).catch((err) => {
  console.log(err);
  process.exit(1);
});
console.log("Connected to MongoDB");
