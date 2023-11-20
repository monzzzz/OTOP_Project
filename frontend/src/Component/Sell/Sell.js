import { useMediaQuery } from "react-responsive";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
import SellSmallDevice from "./Sell_SmallDevice";
import SellLargeDevice from "./Sell_LargeDevice";
import {
  NotAuthenticatedLargeScreen,
  NotAuthenticatedSmallScreen,
} from "./Sell_Not_Authenticated";

export default function Sell() {
  const isSmallDevice = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const isLargeDevice = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const { user, method } = useAuthContext();
  const validMethod = method === "sell";

  return (
    <div className="Sell-container">
      {user && validMethod && (
        <>
          {isSmallDevice && (
            <div>
              <SellSmallDevice />
            </div>
          )}
          {isLargeDevice && (
            <div>
              <SellLargeDevice />
            </div>
          )}
        </>
      )}
      {(!user || !validMethod) && (
        <>
          {isSmallDevice && (
            <div>
              <NotAuthenticatedSmallScreen />
            </div>
          )}
          {isLargeDevice && (
            <div>
              <NotAuthenticatedLargeScreen />
            </div>
          )}
        </>
      )}
    </div>
  );
}
