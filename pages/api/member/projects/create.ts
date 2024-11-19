// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Project } from "@/db/models/Project";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const projectData = req.body;
      const data = {
        ...projectData,
        expense: parseInt(projectData.expense),
        price: parseInt(projectData.price),
      };

      await Project.create(data);

      // const newImages = projectData.images;
      // const existingImages = project.images;
      // newImages.map(async (newImage: string) => {
      //   if (!existingImages.includes(newImage)) {
      //     project.images.push(newImage);
      //   }
      // });
      // await project.save();
      res.status(201).json({ status: "Project created" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
