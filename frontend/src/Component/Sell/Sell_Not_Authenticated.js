import "../../Assets/style/Sell/Sell_Not_Authenticated.css";
import notAuthenticatedImage from "../../Assets/picture/sell_not_authenticated.png";
export function NotAuthenticatedLargeScreen() {
  return (
    <div className="not_authenticated">
      <img
        src={notAuthenticatedImage}
        width="180px"
        height="180px"
        alt="Not Authenticated"
      />
      <h2 className="mt-2">You are Not Authenticated to View this Page</h2>
    </div>
  );
}

export function NotAuthenticatedSmallScreen() {
  return (
    <div className="not_authenticated">
      <img
        src={notAuthenticatedImage}
        width="100px"
        height="100px"
        alt="Not Authenticated"
      />
      <h4 className="mt-2">You are Not Authenticated to View this Page</h4>
    </div>
  );
}
