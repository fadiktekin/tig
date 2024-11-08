import { Button, Typography } from "@mui/material";
import React, { MouseEventHandler } from "react";
import NextLink from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Link, DialogTitle, Dialog } from "@mui/material";
import { useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();

  const { data, status } = useSession();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  if (status === "loading") return <h1> loading... please wait</h1>;
  if (status === "authenticated") {
    return (
      <div>
        <h1> hi {(data as any).user.name}</h1>
        <img
          src={(data as any).user.image}
          alt={(data as any).user.name + " photo"}
        />
        <button onClick={() => signOut()}>sign out</button>
      </div>
    );
  }
  return (
    <>
      <header className="p-4">
        <nav>
          <ul className="flex justify-between">
            <li>Logo</li>
            <div className="flex justify-between gap-2">
              <li>
                <Button color="secondary" variant="contained">
                  Projects
                </Button>
              </li>
              <li>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => handleClickOpen()}
                >
                  Log in
                </Button>
              </li>
              <li>
                <Button variant="contained">Add Project</Button>
              </li>
            </div>
          </ul>
        </nav>
      </header>
      <div>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Hello!</DialogTitle>
          <Typography
            variant="subtitle1"
            component="div"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </Typography>
          <br />
        </Dialog>
      </div>
    </>
  );
}
