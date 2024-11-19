import { useRouter } from "next/router";
import useSWR from "swr";
import { Button, Paper, Typography } from "@mui/material";
import { StatusTag } from "@/components/StatusTag";
import { capitalizeFirstLetter } from "@/components/utils/capitalizeFirstLetter";

export default function ProjectDetails() {
  const router = useRouter();
  const { isReady } = router;
  const { id = "" } = router.query;
  const { data = {}, isLoading, error, mutate } = useSWR(`/api/projects/${id}`);

  if (!id) {
    return null;
  }

  if (!isReady || isLoading || error) return <>Loading...</>;

  const { title, status } = data;

  return (
    <div className="flex justify-between p-4">
      <div className="flex items-center gap-4">
        <Typography variant="h4">{capitalizeFirstLetter(title)}</Typography>
        <StatusTag status={status} />
      </div>
    </div>
  );
}
