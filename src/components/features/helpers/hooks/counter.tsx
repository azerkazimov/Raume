"use client";

import { useEffect, useState } from "react";

interface useCounterProps {
  limit: number;
  speed?: number;
}

export const useCounter = ({ limit, speed = 100 }: useCounterProps) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => (prev >= limit ? prev : prev + 1));
    }, speed);

    return () => clearInterval(interval);
  }, [limit, speed]);

  return counter;
};
