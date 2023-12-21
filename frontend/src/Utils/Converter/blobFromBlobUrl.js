export const fetchBlob = async (blobUrl) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return blob;
};
