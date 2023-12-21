export const blobToFile = (blob, fileName) => {
  return new File([blob], fileName, {
    type: blob.type,
    lastModified: Date.now(),
  });
};
