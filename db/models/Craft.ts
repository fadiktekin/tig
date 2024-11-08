import mongoose from "mongoose";

const { Schema } = mongoose;

const craftSchema = new Schema({
  name: String,
});

export const Craft =
  mongoose.models.Craft || mongoose.model("Craft", craftSchema);
