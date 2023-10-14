import { useMediaQuery } from "react-responsive";
export default function Sell() {
  const isSmallDevice = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const isLargeDevice = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <div className="Sell-container">
      {isSmallDevice && <div></div>}
      {isLargeDevice && <div></div>}
    </div>
  );
}
