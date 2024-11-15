import {
  Link,
  DialogTitle,
  Dialog,
  Button,
  Typography,
  DialogContentText,
  DialogContent,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

import Image from "next/image";
import { styled } from "@mui/material/styles";
import { ChangeEvent, SetStateAction, useState } from "react";

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
export function PhotoUploader({ onClose }: { onClose: Function }) {
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string[]>([]);
  const [files, setFiles] = useState<any>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploadInProgress, setUploadInProgress] = useState(false);

  function handleFileUploadChange(changeEvent: ChangeEvent) {
    const files = (changeEvent.target as HTMLInputElement).files || [];
    setFiles(files);
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreviewSrc((imgs: any) => [...imgs, reader.result]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  }

  function onDelete(imgDataUrl: string) {
    setImagePreviewSrc((prevImageSrc) =>
      prevImageSrc.filter((img) => img !== imgDataUrl)
    );
  }

  async function handleUploadToCloudinary() {
    setUploadInProgress(true);
    const formData = new FormData();
    const uploadedImages: string[] = [];
    for (const file of files) {
      formData.append("file", file);
      formData.append("upload_preset", "amx9xk3g");
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dndvtlb1u/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      uploadedImages.push(data.secure_url);
    }
    setImageUrls(uploadedImages);
    setUploadInProgress(false);
  }

  return (
    <Dialog open>
      <div className="flex justify-between p-2">
        <DialogTitle>Upload Photos</DialogTitle>
        <IconButton aria-label="close" onClick={() => onClose(imageUrls)}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent>
        <div className="border-dashed border-2 border-teaRoseSecondary p-4 mb-4">
          {!!imagePreviewSrc.length && (
            <div className="flex flex-col gap-4">
              {imagePreviewSrc.map((img) => (
                <div className="flex" key={img}>
                  <Image
                    src={img}
                    alt="Image upload"
                    width={200}
                    height={200}
                    style={{
                      objectFit: "contain",
                      width: "auto",
                      height: "auto",
                    }}
                  />
                  <IconButton aria-label="delete" onClick={() => onDelete(img)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-end">
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            size="small"
          >
            Browse
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileUploadChange}
              multiple
            />
          </Button>
          <div className="relative">
            <Button
              disabled={uploadInProgress}
              variant="contained"
              size="small"
              onClick={() => handleUploadToCloudinary()}
            >
              Done
            </Button>
            {uploadInProgress && (
              <CircularProgress
                className="absolute top-1/2 left-1/2 text-gunmetal ml-[-12px] mt-[-12px]"
                size={24}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
