import { withAuth } from "@/components/withAuth";
import { Layout } from "@/components/Dashboard/Layout";

import {
  Button,
  CardContent,
  Card,
  Backdrop,
  CircularProgress,
  Paper,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { PhotoUploader } from "@/components/PhotoUploader";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { ProjectCreateForm } from "@/components/ProjectCreateForm";
import { getImagePreviewsFromFiles } from "../../../components/utils/getImagePreviewsFromFiles";

function NewProject() {
  const { data: session } = useSession();
  const [showPhotoUploader, setShowPhotoUploader] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const [files, setFiles] = useState<any>([]);
  const [imagesData, setImagesData] = useState([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const cloudinaryFormData = new FormData();
    const uploadedImages: string[] = [];
    for (const file of files) {
      cloudinaryFormData.append("file", file);
      cloudinaryFormData.append("upload_preset", "amx9xk3g");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dndvtlb1u/image/upload",
        {
          method: "POST",
          body: cloudinaryFormData,
        }
      );
      const data = await response.json();
      uploadedImages.push(data.secure_url);
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const projectData = Object.fromEntries(formData);
    projectData.userId = (session?.user as any).id;
    (projectData as any)["images"] = uploadedImages;

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

  async function showImagePreviews(files: File[] = []) {
    const imgPreviews = await getImagePreviewsFromFiles(Array.from(files));
    setImagesData(imgPreviews as any);
    setFiles(files);
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
      <div className="flex flex-col items-center gap-4">
        {isPublished && (
          <Alert variant="filled" severity="success">
            Your project is published!
          </Alert>
        )}
        <div className="flex gap-4 flex-col items-center">
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
          </div>
          <ProjectCreateForm handleSubmit={handleSubmit} />
        </div>
      </div>
      {showPhotoUploader && (
        <PhotoUploader
          onClose={(files?: File[]) => {
            if (files) {
              showImagePreviews(files);
            }
            setShowPhotoUploader(false);
          }}
        />
      )}
    </Layout>
  );
}

export default withAuth(NewProject);
