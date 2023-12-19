export const CopyToClipBoard = (textToCopy) => {
  navigator.clipboard.writeText(textToCopy).then(
    () => {
      return "copy successfully";
    },
    (err) => {
      return `Error: ${err}`;
    }
  );
};
