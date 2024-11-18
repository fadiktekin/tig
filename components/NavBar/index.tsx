import React from "react";

import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export function NavBar() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const isAuthenticated = status === "authenticated";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className="px-4 bg-white w-full border-2 border-b-teaRoseSecondary sticky top-0 z-10">
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
                Browse Projects
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
                  id="user-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Image
                    className="rounded-full"
                    src={(session as any).user.image}
                    width={25}
                    height={25}
                    alt="logo"
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  className="teaRoseSecondary"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "user-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      router.push("/member/dashboard");
                      handleClose();
                    }}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      handleClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}
