import { Link, DialogTitle, Dialog, Button, Typography } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Layout } from "../../../components/Dashboard/Layout";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    console.log(session);

    return (
      <Layout>
        <h1> hi {(session as any).user.name}</h1>
        <img
          src={(session as any).user.image}
          alt={(session as any).user.name + " photo"}
        />
        <button onClick={() => signOut({ callbackUrl: "/" })}>sign out</button>
      </Layout>
    );
  }
  return null;
}
