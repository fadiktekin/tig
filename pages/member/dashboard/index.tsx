import { Link, DialogTitle, Dialog, Button, Typography } from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";
import { Layout } from "@/components/Dashboard/Layout";
import { withAuth } from "@/components/withAuth";

function Dashboard() {
  const { data: session } = useSession();
  console.log("Dashboard", session);
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

export default withAuth(Dashboard);
