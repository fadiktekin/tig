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
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  data?: FromDataType;
};

type FromDataType = {
  title?: string;
  description?: string;
  craft?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  expense?: number;
  price?: number;
};
export function ProjectCreateForm({ handleSubmit, data = {} }: Props) {
  const [formData, setFormData] = useState<FromDataType>(data);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
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
              color="success"
              id="title"
              label="title"
              value={formData.title}
              required
              name={"title"}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
              }
            />
            <TextField
              variant="outlined"
              color="success"
              label="description"
              name={"description"}
              value={formData.description}
              multiline
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
              }
            />
            <FormControl variant="outlined">
              <InputLabel id="craft">Craft</InputLabel>
              <Select
                labelId="craft"
                id="option-crochet"
                name="craft"
                value={formData.craft}
                label="Crochet"
                onChange={(event) => handleChange(event)}
                required
                color="success"
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
                onChange={(event) => handleChange(event)}
                required
                color="success"
              >
                <MenuItem value={"in progress"}>In Progress</MenuItem>
                <MenuItem value={"finished"}>Finished</MenuItem>
              </Select>
            </FormControl>
            <DatePicker
              label="Start date"
              name="startDate"
              value={dayjs(formData.startDate)}
              slotProps={{
                textField: {
                  color: "success",
                },
              }}
            />
            <DatePicker
              label="End date"
              name="endDate"
              value={dayjs(formData.endDate)}
              slotProps={{
                textField: {
                  color: "success",
                },
              }}
            />
            <TextField
              color="success"
              label="Expense"
              name="expense"
              type="number"
              value={formData.expense}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
              }
            />
            <TextField
              color="success"
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(event)
              }
            />
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-2">
        <Button
          color="secondary"
          variant="contained"
          onClick={() => router.back()}
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
