import useSWR from "swr";
import { withAuth } from "@/components/withAuth";
import { useSession } from "next-auth/react";
import { Layout } from "@/components/Dashboard/Layout";
import { Card } from "@mui/material";
import Image from "next/image";

function Projects() {
  const { data: session } = useSession();
  const {
    data: userProjects,
    error,
    isLoading,
  } = useSWR(`/api/member/projects?userId=${(session?.user as any)?.id}`);
  console.log("DATA", userProjects);

  if (!userProjects) {
    return <>loading...</>;
  }
  return (
    <Layout>
      I'm members projects
      {userProjects.map((project: any) => (
        <Card className="flex gap-1">
          {project.images.map((image: string) => (
            <Image width={100} height={100} src={image} alt="project image" />
          ))}
        </Card>
      ))}
    </Layout>
  );
}

export default withAuth(Projects);
