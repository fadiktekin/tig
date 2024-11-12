import { withAuth } from "@/components/withAuth";
import { Layout } from "@/components/Dashboard/Layout";

import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CardContent,
  Card,
  CardActions,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent, useState } from "react";
import { PhotoUploader } from "@/components/PhotoUploader";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function NewProject() {
  const [showPhotoUploader, setShowPhotoUploader] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);

    try {
    } catch (error) {}
  }

  function handleFileUploadChange() {
    setShowPhotoUploader(!showPhotoUploader);
  }

  return (
    <Layout>
      <div className="flex items-start justify-between">
        <Card className="min-w-96">
          <CardContent>
            <Typography variant="h6" className="pb-3">
              Project Details
            </Typography>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                id="title"
                label="id"
                name={"title"}
              />
              <TextField
                variant="outlined"
                label="description"
                name={"description"}
                multiline
              />
              <FormControl variant="outlined">
                <InputLabel id="demo-simple-select-standard-label">
                  Age
                </InputLabel>
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

              <Button component="button" type="submit" variant="contained">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            onClick={() => handleFileUploadChange()}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
          </Button>
          {showPhotoUploader && (
            <PhotoUploader onClose={() => setShowPhotoUploader(false)} />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(NewProject);
