import { useAuthContext } from "../useAuthContext";

export default function useBuySignupVerification() {
  const { dispatch } = useAuthContext();
  const verify = async (passcode, userId) => {
    const response = await fetch("/api/user/buy/verify", {
      method: "POST",
      body: JSON.stringify({ passcode: passcode, userId: userId }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (response.ok) {
      const data = { json: json, method: "buy" };
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: json, method: "buy" });
      return "successfully";
    }
    if (!response.ok) {
      return json.error;
    }
  };
  return { verify };
}
