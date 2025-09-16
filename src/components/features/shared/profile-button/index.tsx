"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "../sidebar";
import { UserIcon } from "lucide-react";

export function ProfileButton() {
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-2">
        <Link href="/dashboard">
          {session.user?.image ? (
            <Image
              src={session.user?.image || ""}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-[38px] h-[38px] rounded-full bg-gray-200 flex items-center justify-center">
              {/* <UserIcon className="w-4 h-4" /> */}
              <span className="">{session.user?.name?.charAt(0).toUpperCase()}</span>
            </div>
          )}
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
