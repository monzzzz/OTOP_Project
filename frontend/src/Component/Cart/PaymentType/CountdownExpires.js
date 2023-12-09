import React, { useState, useEffect } from "react";

export const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiry = new Date(expiryDate);
      const difference = expiry - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);

        setTimeLeft(`${hours} hours and ${minutes} minutes left`);
      } else {
        setTimeLeft("Expired");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryDate]);

  return <div>{timeLeft}</div>;
};
