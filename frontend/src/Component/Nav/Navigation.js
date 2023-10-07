import { useMediaQuery } from "react-responsive";
import SmallDevice from "./Nav-Screen/Nav_SmallDevice";
import LargeDevice from "./Nav-Screen/Nav_LargeDevice";
export default function Navigation() {
  const isSmallDevice = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const isLargeDevice = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <div className="Navigation-container">
      {isSmallDevice && (
        <div>
          <SmallDevice />
        </div>
      )}
      {isLargeDevice && (
        <div>
          <LargeDevice />
        </div>
      )}
    </div>
  );
}
