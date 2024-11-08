import Image from "next/image";
import localFont from "next/font/local";
import useSWR from "swr";
import Card from "@mui/material/Card";

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

async function fetcher(...args: Parameters<typeof fetch>) {
  return (await fetch(...args)).json();
}
export default function Home() {
  const { data, error, isLoading } = useSWR("/api/projects", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  console.log(data);
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {data.map(({ title, _id }: { title: string; _id: string }) => {
          return <Card key={_id}>{title}</Card>;
        })}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
