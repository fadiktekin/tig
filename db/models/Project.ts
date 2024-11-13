import mongoose from "mongoose";
import { Craft } from "./Craft";
import { User } from "./User";

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: { type: String },
  craft: { type: Schema.Types.ObjectId, ref: "Craft" },
  startDate: { type: String },
  endDate: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  images: { type: [String] },
});

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
