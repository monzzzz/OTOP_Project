import { useReducer, createContext, useEffect } from "react";

export const AuthContext = createContext();

// state is a current value variable
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, method: action.method };
    case "LOGOUT":
      return { user: null, method: null };
    case "CHANGE_NAME":
      return { user: action.payload, method: action.method };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    method: null,
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user.json, method: user.method });
    }
  }, []);
  console.log(state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
