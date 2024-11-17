import { useRouter } from "next/router";
import { FormEventHandler, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CardContent,
  Card,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

type Props = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
};
export function ProjectCreateForm({ handleSubmit }: Props) {
  const [craft, setCraft] = useState("");
  const [status, setStatus] = useState("");

  const handleCraftChange = (event: SelectChangeEvent) => {
    setCraft(event.target.value as string);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  const router = useRouter();
  return (
    <form className="flex flex-col items-end gap-4" onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <Card className="min-w-96">
          <CardContent className="flex flex-col gap-2">
            <Typography variant="h6" className="pb-3">
              Project Details
            </Typography>

            <TextField
              variant="outlined"
              id="title"
              label="title"
              required
              name={"title"}
            />
            <TextField
              variant="outlined"
              label="description"
              name={"description"}
              multiline
            />
            <FormControl variant="outlined">
              <InputLabel id="craft">Craft</InputLabel>
              <Select
                labelId="craft"
                id="option-crochet"
                name="craft"
                value={craft}
                label="Crochet"
                onChange={handleCraftChange}
              >
                <MenuItem value={"crochet"}>Crochet</MenuItem>
                <MenuItem value={"knitting"}>Knitting</MenuItem>
                <MenuItem value={"sewing"}>Sewing</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="option-inprogress"
                name="status"
                value={status}
                label="In Progress"
                onChange={handleStatusChange}
              >
                <MenuItem value={"inprogress"}>In Progress</MenuItem>
                <MenuItem value={"finished"}>Finished</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-2">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => router.push("/member/projects/")}
        >
          Cancel
        </Button>
        <Button color="primary" variant="contained" type="submit">
          Publish
        </Button>
      </div>
    </form>
  );
}
