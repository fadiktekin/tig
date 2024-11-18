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

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
};

type FromDataType = {
  status?: string;
  craft?: string;
};
export function ProjectCreateForm({ handleSubmit }: Props) {
  const [formData, setFormData] = useState<FromDataType>({});

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
                value={formData.craft}
                label="Crochet"
                onChange={handleChange}
                required
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
                value={formData.status}
                label="In Progress"
                onChange={handleChange}
                required
              >
                <MenuItem value={"in progress"}>In Progress</MenuItem>
                <MenuItem value={"finished"}>Finished</MenuItem>
              </Select>
            </FormControl>
            <DatePicker label="Start date" name="startDate" />
            <DatePicker label="End date" name="endDate" />
            <TextField label="Expense" name="espense" type="number" />
            <TextField label="Price" name="price" type="number" />
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
