// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/db/connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/db/models/Project";

type Data = {
  [key: string]: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();

  if (req.method === "GET") {
    const projects: Data[] = await Project.find();
    console.log("HERE", projects);
    res.status(200).json(projects);
  }
}
