import { useState } from "react";

export default function useOffer() {
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState(null);
  const offer = async (title, price, history, province, category) => {
    const response = fetch("/api/market/products", {
      method: "POST",
      body: JSON.stringify({ title, price, history, province, category }),
      headers: { "Content-Type": "application/json" },
    });
    const json = response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      // fetch the info to the database
      //
    }
  };
  return { offer, isLoading, error };
}
