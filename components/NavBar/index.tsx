import React from "react";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";

export function NavBar() {
  const router = useRouter();
  return (
    <header className="px-4 bg-white w-full border-2 border-t-grey-50">
      <nav>
        <ul className="flex justify-between items-center">
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="logo"
            style={{ objectFit: "contain" }}
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
            <li>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => router.push("/login")}
              >
                Log in
              </Button>
            </li>
            <li>
              <Button variant="contained" onClick={() => router.push("/login")}>
                Add Project
              </Button>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
