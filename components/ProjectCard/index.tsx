import { Card, Typography } from "@mui/material";
import Image from "next/image";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { useRouter } from "next/router";
export function ProjectCard({ project }: { project: any }) {
  const router = useRouter();
  return (
    <Card
      className="w-[256px] h-[317px] border-solid border-2 border-teaRoseSecondary cursor-pointer"
      onClick={() => {
        router.push(`/projects/${project._id}`);
      }}
    >
      <div className="flex flex-col p-4 h-[247px] w-[256px] relative">
        <Image
          style={{ objectFit: "cover" }}
          fill
          priority
          src={project.images[0] ?? "/no_image.png"}
          alt="project image"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-2">
        <Typography variant="subtitle1" className=" bold">
          <b>{capitalizeFirstLetter(project.title)}</b>
        </Typography>
        <Typography className="">by {project.userId.name}</Typography>
      </div>
    </Card>
  );
}
