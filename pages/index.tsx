import Image from "next/image";
import localFont from "next/font/local";
import useSWR from "swr";
import Card from "@mui/material/Card";
import { ProjectCard } from "@/components/ProjectCard";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/projects");

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex justify-center`}
    >
      <section className="gap-4 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((project: { title: string; _id: string }) => {
          return <ProjectCard key={project._id} project={project} />;
        })}
      </section>
    </div>
  );
}
