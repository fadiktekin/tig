import { Typography } from "@mui/material";

export function CurrencyField({
  value,
  label,
}: {
  value: number;
  label?: string;
}) {
  return (
    <Typography variant="subtitle1">
      {label && `${label}:  `}
      <b>
        {value.toLocaleString("de-DE", {
          style: "currency",
          currency: "EUR",
        })}
      </b>
    </Typography>
  );
}
