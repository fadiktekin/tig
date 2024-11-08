// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/db/connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/db/models/Project";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  if (req.method === "GET") {
    const projects = await Project.find();
    res.status(200).json(projects);
  }
}
