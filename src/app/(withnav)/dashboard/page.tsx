"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      Dashboard
      <Button onClick={() => signOut({ callbackUrl: "/auth/signin" })}>Logout</Button>
    </div>
  );
}
