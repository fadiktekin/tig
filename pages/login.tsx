import {
  Link,
  DialogTitle,
  Dialog,
  Button,
  Typography,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/router";

export default function Login() {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/member/dashboard");
  }

  return (
    <Dialog open>
      <DialogTitle>Hello!</DialogTitle>
      <DialogContent>
        <DialogContentText className="py-4">
          Use google to continue with Tig
        </DialogContentText>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => signIn("google", { callbackUrl: `/member/dashboard` })}
          startIcon={<GoogleIcon />}
        >
          Sign in with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
