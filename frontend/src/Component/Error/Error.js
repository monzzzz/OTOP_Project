import { useLocation } from "react-router-dom";

export default function Error() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const errorMessage = queryParams.get("message");
  return (
    <div>
      <h1>Error</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
