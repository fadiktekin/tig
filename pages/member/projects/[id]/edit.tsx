import { useRouter } from "next/router";
import { Layout } from "@/components/Dashboard/Layout";
import {
  Button,
  CardContent,
  Card,
  Backdrop,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { PhotoUploader } from "@/components/PhotoUploader";
import { withAuth } from "@/components/withAuth";
import { ProjectCreateForm } from "@/components/ProjectCreateForm";

function EditProject() {
  const router = useRouter();
  const { isReady } = router;
  const { id = "" } = router.query;
  const { data = {}, isLoading, error, mutate } = useSWR(`/api/projects/${id}`);
  const [showPhotoUploader, setShowPhotoUploader] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const projectData = Object.fromEntries(formData);
    await fetch(`/api/member/projects/${id}`, {
      method: "PATCH",
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

  return (
    <Layout>
      <Backdrop
        open={isSubmitting}
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex flex-col items-center gap-4">
        {isPublished && (
          <Alert variant="filled" severity="success">
            Your project is published!
          </Alert>
        )}
        <div className="flex gap-4 flex-col items-center">
          {/* <div className="flex flex-col gap-4">
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
                  Select files
                </Button>
                <div className="flex gap-1">
                  {imagesData.map(
                    (data: { imgDataUrl: string; fileName: string }) => (
                      <Image
                        width={100}
                        height={100}
                        src={data.imgDataUrl ?? "/no_image.png"}
                        alt="project image"
                      />
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div> */}
          <ProjectCreateForm data={data} handleSubmit={handleSubmit} />
        </div>
      </div>
      {showPhotoUploader && (
        <PhotoUploader
          onClose={(files?: File[]) => {
            // if (files) {
            //   showImagePreviews(files);
            // }
            // setShowPhotoUploader(false);
          }}
        />
      )}
    </Layout>
  );
}

export default withAuth(EditProject);
