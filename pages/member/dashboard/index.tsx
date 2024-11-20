import { useSession } from "next-auth/react";
import { Layout } from "@/components/Dashboard/Layout";
import { withAuth } from "@/components/withAuth";
import { Paper, Typography } from "@mui/material";
import Image from "next/image";
import { StatusTag } from "@/components/StatusTag";
import ColorScale from "@/components/ColorScale";

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
      <Paper elevation={3} className="my-4 p-4">
        <Typography variant="h6">Overview</Typography>
        <div>
          You have <b>2</b> projects <StatusTag status={"in progress"} />
        </div>
        <ColorScale />
      </Paper>
    </Layout>
  );
}

export default withAuth(Dashboard);
