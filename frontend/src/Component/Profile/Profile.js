import { useMediaQuery } from "react-responsive";
import LargeScreenProfile from "./Profile_Screen/Large_Screen_Profile";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
export default function Profile() {
  const isSmallDevice = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const isLargeDevice = useMediaQuery({
    query: "(min-width:1024px)",
  });
  const { user } = useAuthContext();
  return (
    <div>
      {user ? (
        <>
          {isSmallDevice && <div></div>}
          {isLargeDevice && (
            <div>
              <LargeScreenProfile />
            </div>
          )}
        </>
      ) : (
        <div>You have not login</div>
      )}
    </div>
  );
}
