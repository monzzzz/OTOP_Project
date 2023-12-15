export default function useBuySignupVerification() {
  const verify = async (passcode, userId) => {
    const response = await fetch("/api/user/buy/verify", {
      method: "POST",
      body: JSON.stringify({ passcode: passcode, userId: userId }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (response.ok) {
      return json.userState;
    }
    if (!response.ok) {
      return json.error;
    }
  };
  return { verify };
}
