import { useSession } from "next-auth/react";
import { Layout } from "@/components/Dashboard/Layout";
import { withAuth } from "@/components/withAuth";

function Dashboard() {
  const { data: session } = useSession();
  console.log("Dashboard", session);
  return (
    <Layout>
      <h1 className="pb-4">
        {" "}
        Welcome to your Dashboard {(session as any).user.name}
      </h1>
      <img
        src={(session as any).user.image}
        alt={(session as any).user.name + " photo"}
      />
    </Layout>
  );
}

export default withAuth(Dashboard);
