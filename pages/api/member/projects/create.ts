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
      const project = await Project.findOne({ userId: projectData.userId });
      if (project === null) {
        return await Project.create({
          images: [projectData.imageUrl],
          userId: projectData.userId,
        });
      }

      const projectImages = project.images;
      console.log(projectImages);
      if (!projectImages.includes(projectData.imageUrl)) {
        project.images.push(projectData.imageUrl);
        await project.save();
        // const project = await Project.findOneAndUpdate(
        //   { userId: projectData.userId },
        //   {
        //     $push: { images: projectData.imageUrl },
        //   }
        // );
      }

      res.status(201).json({ status: "Project created" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
