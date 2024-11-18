const reader = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({ fileName: file.name, imgDataUrl: reader.result });
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

export async function getImagePreviewsFromFiles(
  files: File[]
): Promise<string[]> {
  if (!files) {
    return Promise.resolve([]);
  }

  let imagePreviewSrc: any[] = [];
  const frPromises = Array.from(files).map(reader);
  try {
    imagePreviewSrc = await Promise.all(frPromises);
  } catch (error) {
    console.log(error);
    return Promise.resolve([]);
  }

  return imagePreviewSrc;
}
