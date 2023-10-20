import { AuthContext } from "../../Context/AuthenticationContext/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("AuthContext must be used inside authContextProviders");
  }
  return context;
};
