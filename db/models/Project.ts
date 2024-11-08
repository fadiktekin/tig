import mongoose from "mongoose";
import { Craft } from "./Craft";

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: { type: String, required: true },
  craft: { type: [Schema.Types.ObjectId], ref: "Craft" },
  startDate: { type: String },
  endDate: { type: String },
});

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
