import { useSession } from "next-auth/react";
import { Layout } from "@/components/Dashboard/Layout";
import { withAuth } from "@/components/withAuth";
import { Typography } from "@mui/material";
import Image from "next/image";

function Dashboard() {
  const { data: session } = useSession();
  console.log("Dashboard", session);
  return (
    <Layout>
      <Typography variant="h4" className="pb-4">
        Welcome to your Dashboard {(session as any).user.name}
      </Typography>
      <Image
        src={(session as any).user.image}
        width={200}
        height={200}
        alt={(session as any).user.name + " photo"}
        priority
        style={{ objectFit: "contain", width: "auto", height: "auto" }}
      />
    </Layout>
  );
}

export default withAuth(Dashboard);
