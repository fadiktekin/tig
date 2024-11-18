import mongoose from "mongoose";
import { User } from "./User";

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: { type: String },
  description: { type: String },
  craft: { type: String },
  status: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  images: { type: [String] },
  expense: { type: String },
  price: { type: String },
});

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
