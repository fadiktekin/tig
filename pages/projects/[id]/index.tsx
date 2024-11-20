import { useRouter } from "next/router";
import { Paper, Typography } from "@mui/material";
import { StatusTag } from "@/components/StatusTag";
import Image from "next/image";
import useSWR from "swr";
import { capitalizeFirstLetter } from "@/components/utils/capitalizeFirstLetter";
import { CurrencyField } from "@/components/CurrencyField";

export default function ProjectDetails() {
  const router = useRouter();
  const { isReady } = router;
  const { id = "" } = router.query;
  const { data = {}, isLoading, error, mutate } = useSWR(`/api/projects/${id}`);

  if (!id) {
    return null;
  }

  if (!isReady || isLoading || error) return <>Loading...</>;

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

  return (
    <section className="flex justify-center p-4">
      <div className="w-1/2">
        <div className="flex items-center gap-2 mb-4">
          <Typography variant="h4">{capitalizeFirstLetter(title)}</Typography>
          <StatusTag status={status} />
        </div>
        <article className="flex flex-col gap-4">
          {!!images.length && (
            <Paper elevation={3} className="p-4">
              <section className="flex gap-4 flex-wrap">
                {images.map((imageUrl: string) => (
                  <Image
                    key={imageUrl}
                    src={imageUrl}
                    priority
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
            <CurrencyField label="Expense" value={expense} />
            <CurrencyField label="Price" value={price} />
            <Typography variant="h5" className="my-3">
              Description
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Paper>
        </article>
      </div>
    </section>
  );
}
