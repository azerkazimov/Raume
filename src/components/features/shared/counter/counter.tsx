"use client";

import { Button } from "@/components/ui/button";
import useCounter from "../store/use-counter";
import { useEffect } from "react";


export default function Counter({ counter }: { counter: number }) {
  const { count, increment, decrement, reset, setCount } = useCounter();

  // Set initial counter value when component mounts or counter prop changes
  useEffect(() => {
    setCount(counter);
  }, [counter, setCount]);

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 mt-12">
      <h1 className="text-2xl font-bold">Zustand counter</h1>
      <div className="flex items-center gap-4">
        <Button onClick={decrement}>Decrement</Button>
        <span className="text-2xl font-bold">{count}</span>
        <Button onClick={increment}>Increment</Button>
      </div>
      <Button onClick={reset} variant="outline">Reset</Button>
    </div>
  );
}
