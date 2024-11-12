import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth(Component: NextComponentType) {
  const Auth = (props: any) => {
    const { status } = useSession();
    const router = useRouter();
    console.log("WithAuth");

    if (status === "unauthenticated") {
      console.log("HERE");
      return router.push("/login");
    }

    if (status === "loading") return <h1> loading... please wait</h1>;

    // If user is logged in, return original component
    return status === "authenticated" && <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}
