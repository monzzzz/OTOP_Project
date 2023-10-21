import { useMediaQuery } from "react-responsive";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
import Sell_SmallDevice from "./Sell_SmallDevice";
import {
  Not_Authenticated_Large_Screen,
  Not_Authenticated_Small_Screen,
} from "./Sell_Not_Authenticated";
export default function Sell() {
  const isSmallDevice = useMediaQuery({
    query: "(max-width: 640px)",
  });
  const isLargeDevice = useMediaQuery({
    query: "(min-width: 640px)",
  });
  const { user, method } = useAuthContext();
  const validMethod = method === "sell";

  return (
    <div className="Sell-container">
      {user && validMethod && (
        <>
          {isSmallDevice && (
            <div>
              <Sell_SmallDevice />
            </div>
          )}
          {isLargeDevice && <div></div>}
        </>
      )}
      {!user ||
        (!validMethod && (
          <>
            {isSmallDevice && (
              <div>
                <Not_Authenticated_Small_Screen />
              </div>
            )}
            {isLargeDevice && (
              <div>
                <Not_Authenticated_Large_Screen />
              </div>
            )}
          </>
        ))}
    </div>
  );
}
