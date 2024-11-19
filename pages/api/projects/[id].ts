import dbConnect from "@/db/connect";
import { Project } from "@/db/models/Project";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    const id = req.query.id;
    const project = await Project.findById(id).populate("userId");

    if (!project) {
      res.status(400).json({ status: "Not found" });
    }
    res.status(200).json(project);
  }
}
