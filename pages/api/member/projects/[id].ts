// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from "@/db/connect";
import { Project } from "@/db/models/Project";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "PATCH") {
    const copy = { ...req.body };
    Object.keys(copy).forEach((key) => {
      if (!copy[key]) delete copy[key];
    });

    await Project.findByIdAndUpdate(id, copy);
    res.status(200).json({ status: `Project ${id} updated!` });
  }
}
