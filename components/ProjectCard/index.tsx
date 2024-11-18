import { Card, Typography } from "@mui/material";
import Image from "next/image";
export function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="w-[256px] h-[317px] border-solid border-2 border-teaRoseSecondary">
      <div className="flex flex-col p-4 h-[247px] w-[256px] relative">
        <Image
          style={{ objectFit: "cover" }}
          fill
          src={project.images[0] ?? "/no_image.png"}
          alt="project image"
        />
      </div>
      <div className="p-2">
        <Typography variant="subtitle1" className=" bold">
          <b>{project.title}</b>
        </Typography>
        <Typography className="">by {project.userId.name}</Typography>
      </div>
    </Card>
  );
}
