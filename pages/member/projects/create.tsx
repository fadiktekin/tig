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
  Typography,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { PhotoUploader } from "@/components/PhotoUploader";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const [showPhotoUploader, setShowPhotoUploader] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target as HTMLFormElement);

    const projectData = Object.fromEntries(formData);
    projectData.userId = (session?.user as any).id;
    (projectData as any)["images"] = imageUrls;

    await fetch("/api/member/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    });
    setIsPublished(true);
    try {
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleFileUploadChange() {
    setShowPhotoUploader(!showPhotoUploader);
  }

  return (
    <Layout>
      <Backdrop
        open={isSubmitting}
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex flex-col items-center">
        {isPublished && (
          <Alert variant="filled" severity="success">
            Your project is published!
          </Alert>
        )}

        <form className="flex flex-col items-end gap-4" onSubmit={handleSubmit}>
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
                  <InputLabel id="age">Age</InputLabel>
                  <Select
                    labelId="age"
                    id="option-10"
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
              </CardContent>
            </Card>
            <div className="flex flex-col gap-4">
              <Card className="min-w-96">
                <CardContent className="flex flex-col gap-4">
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
                  <div className="flex gap-1">
                    {imageUrls.map((image: string) => (
                      <Image
                        width={100}
                        height={100}
                        src={image}
                        alt="project image"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
      {showPhotoUploader && (
        <PhotoUploader
          onClose={(newUrls: string[]) => {
            setImageUrls(newUrls);
            setShowPhotoUploader(false);
          }}
        />
      )}
    </Layout>
  );
}

export default withAuth(NewProject);
