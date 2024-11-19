import { useRouter } from "next/router";
import { Layout } from "@/components/Dashboard/Layout";
import { Button, Paper, Typography } from "@mui/material";
import { StatusTag } from "@/components/StatusTag";
import Image from "next/image";
import useSWR from "swr";
import { capitalizeFirstLetter } from "@/components/utils/capitalizeFirstLetter";

export default function MemberProjectDetail() {
  const router = useRouter();
  const { isReady } = router;
  const { id = "" } = router.query;
  const { data = {}, isLoading, error, mutate } = useSWR(`/api/projects/${id}`);

  if (!id) {
    return null;
  }

  if (!isReady || isLoading || error)
    return (
      <Layout>
        <h2>Loading...</h2>
      </Layout>
    );
  console.log(data);
  const {
    images,
    title,
    description,
    status,
    startDate,
    endDate,
    expense,
    price,
  } = data;

  function handleEdit(event: React.MouseEvent<HTMLButtonElement>) {}

  return (
    <Layout>
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-4">
          <Typography variant="h4">{capitalizeFirstLetter(title)}</Typography>
          <StatusTag status={status} />
        </div>
        <Button variant="contained" onClick={handleEdit}>
          Edit
        </Button>
      </div>
      <article className="flex flex-col gap-4">
        {!!images.length && (
          <Paper elevation={3} className="p-4">
            <section className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {images.map((imageUrl: string) => (
                <Image
                  src={imageUrl}
                  alt="project image"
                  width={200}
                  height={200}
                />
              ))}
            </section>
          </Paper>
        )}
        <Paper elevation={3} className="p-4">
          <Typography variant="subtitle1">
            Start date: <b>{startDate}</b>
          </Typography>
          <Typography variant="subtitle1">
            Finish date: <b>{endDate}</b>
          </Typography>
          <Typography variant="subtitle1">
            Expense: <b>{expense}</b>
          </Typography>
          <Typography variant="subtitle1">
            Price: <b>{price}</b>
          </Typography>
          <Typography variant="h5" className="mt-4">
            Description
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Paper>
      </article>
    </Layout>
  );
}
