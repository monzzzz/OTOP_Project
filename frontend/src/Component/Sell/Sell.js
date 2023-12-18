import { useMediaQuery } from "react-responsive";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
import { Navigate } from "react-router-dom";
import SellSmallDevice from "./Sell_SmallDevice";
import SellLargeDevice from "./Sell_LargeDevice";
import { invalid } from "moment";

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
    </div>
  );
}
