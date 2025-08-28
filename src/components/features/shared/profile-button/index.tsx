"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "../sidebar";

export function ProfileButton() {
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          <Image
            src={session.user?.image || ""}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <Sidebar />
      </div>
    );
  } else {
    return (
      <Link href="/auth/signin">
        <Button className="cursor-pointer">Sign In</Button>
      </Link>
    );
  }
}
