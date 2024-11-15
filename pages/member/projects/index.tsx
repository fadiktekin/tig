import useSWR from "swr";
import { withAuth } from "@/components/withAuth";
import { useSession } from "next-auth/react";
import { Layout } from "@/components/Dashboard/Layout";
import { Card, Typography } from "@mui/material";
import Image from "next/image";
import { ProjectCard } from "@/components/ProjectCard";

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
      My projects
      <section className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {userProjects.map((project: any) => (
          <ProjectCard project={project} />
        ))}
      </section>
    </Layout>
  );
}

export default withAuth(Projects);
