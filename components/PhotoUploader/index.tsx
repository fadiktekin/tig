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
  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [files, setFiles] = useState<any>();

  function handleFileUploadChange(changeEvent: ChangeEvent) {
    const files = (changeEvent.target as HTMLInputElement).files || [];
    setFiles(files);
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc((imgs: any) => [...imgs, reader.result]);
      };
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  }

  function onDelete(imgDataUrl: string) {
    setImageSrc((prevImageSrc) =>
      prevImageSrc.filter((img) => img !== imgDataUrl)
    );
  }

  function handleUpload() {
    const formData = new FormData();
    for (const file of files) {
      formData.append("file", file);

      console.log(file);
    }
    formData.append("upload_preset", "<upload preset>");
    console.log(formData);
  }
  return (
    <Dialog open>
      <div className="flex">
        <DialogTitle>Upload Photos</DialogTitle>
        <IconButton aria-label="close" onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent>
        <div className="border-dashed border-2 border-teaRoseSecondary p-4 mb-4">
          {!!imageSrc.length && (
            <div className="flex flex-col gap-4">
              {imageSrc.map((img) => (
                <div className="flex" key={img}>
                  <Image
                    src={img}
                    alt="Image upload"
                    width={200}
                    height={200}
                  />
                  <IconButton aria-label="delete" onClick={() => onDelete(img)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
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
          <Button
            variant="contained"
            size="small"
            onClick={() => handleUpload()}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
