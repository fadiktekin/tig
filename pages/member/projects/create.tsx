import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useSWR from "swr";

export default function NewProject() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);

    try {
    } catch (error) {}
  }
  return (
    <form className="flex flex-col gap-1 w-60" onSubmit={handleSubmit}>
      <TextField variant="filled" id="title" label="id" name={"title"} />
      <TextField
        variant="filled"
        label="description"
        name={"description"}
        multiline
      />
      <FormControl variant="filled">
        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          name="age"
          value={10}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <button type="submit">Submit</button>
    </form>
  );
}
