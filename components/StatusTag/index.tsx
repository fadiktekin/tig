import { Chip } from "@mui/material";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

export function StatusTag({ status }: { status: string }) {
  const color = status !== "finished" ? "info" : "success";

  return <Chip label={capitalizeFirstLetter(status)} color={color} />;
}
