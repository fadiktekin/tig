import mongoose from "mongoose";
import { Project } from "./Project";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  name: { type: String, required: [true, "Name is required"] },
  image: { stype: String },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
