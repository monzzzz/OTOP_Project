import { useMediaQuery } from "react-responsive";
import Large_Screen_Profile from "./Profile_Screen/Large_Screen_Profile";
export default function Profile() {
  const isSmallDevice = useMediaQuery({
    query: "(max-width: 640px)",
  });
  const isLargeDevice = useMediaQuery({
    query: "(min-width: 640px)",
  });
  return (
    <div>
      <>
        {isSmallDevice && <div></div>}
        {isLargeDevice && (
          <div>
            <Large_Screen_Profile />
          </div>
        )}
      </>
    </div>
  );
}
