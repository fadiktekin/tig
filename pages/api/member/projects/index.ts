import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/db/models/Project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const userId = req.query.userId;
      const projects = await Project.find({ userId: userId });
      res.status(201).json(projects);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
