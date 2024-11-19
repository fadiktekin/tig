import { Typography } from "@mui/material";

export function CurrencyField({
  value,
  title,
}: {
  value: number;
  title: string;
}) {
  return (
    <Typography variant="subtitle1">
      {title}:{" "}
      <b>
        {value.toLocaleString("de-DE", {
          style: "currency",
          currency: "EUR",
        })}
      </b>
    </Typography>
  );
}
