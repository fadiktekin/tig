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
import { ChangeEvent, useState } from "react";
import { getImagePreviewsFromFiles } from "@/components/utils/getImagePreviewsFromFiles";

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
  const [files, setFiles] = useState<File[]>([]);
  const [imagesData, setImagesData] = useState([]);

  async function handleFileUploadChange(changeEvent: ChangeEvent) {
    const files = (changeEvent.target as HTMLInputElement).files || [];
    const imgPreviews = await getImagePreviewsFromFiles(Array.from(files));
    setImagesData(imgPreviews as any);
    setFiles(Array.from(files));
  }

  function onDelete(fileName: string) {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setImagesData((prevImagesData) =>
      prevImagesData.filter(
        (data: { fileName: string; imgDataUrl: string }) =>
          data.fileName !== fileName
      )
    );
  }

  return (
    <Dialog open>
      <div className="flex justify-between p-2">
        <DialogTitle>Upload Photos</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose();
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <DialogContent>
        <div className="border-dashed border-2 border-teaRoseSecondary p-4 mb-4">
          {!!imagesData.length && (
            <div className="flex flex-col gap-4">
              {imagesData.map(
                ({
                  fileName,
                  imgDataUrl,
                }: {
                  fileName: string;
                  imgDataUrl: string;
                }) => (
                  <div className="flex" key={imgDataUrl}>
                    <Image
                      src={imgDataUrl}
                      alt="Image upload"
                      width={200}
                      height={200}
                      style={{
                        objectFit: "contain",
                        width: "auto",
                        height: "auto",
                      }}
                    />
                    <IconButton
                      aria-label="delete"
                      onClick={() => onDelete(fileName)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )
              )}
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
              accept=".jpg, .jpeg, .png"
              multiple
            />
          </Button>
          <div className="relative">
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                onClose(files);
              }}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
