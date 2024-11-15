import React from "react";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export function NavBar() {
  const { status, data: session } = useSession();
  const isAuthenticated = status === "authenticated";
  const router = useRouter();
  return (
    <header className="px-4 bg-white w-full border-2 border-b-teaRoseSecondary">
      <nav>
        <ul className="flex justify-between items-center">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="logo"
            priority
            style={{ objectFit: "contain", width: "auto", height: "auto" }}
          />
          <div className="flex justify-between gap-2">
            <li>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => router.push("/")}
              >
                Projects
              </Button>
            </li>
            {!isAuthenticated && (
              <li>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => router.push("/login")}
                >
                  Log in
                </Button>
              </li>
            )}
            <li>
              <Button
                variant="contained"
                onClick={() => router.push("/member/projects/create")}
              >
                Add Project
              </Button>
            </li>
            {isAuthenticated && (
              <li>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => router.push("/member/dashboard")}
                >
                  <Image
                    className="rounded-full"
                    src={(session as any).user.image}
                    width={25}
                    height={25}
                    alt="logo"
                  />
                </Button>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}
