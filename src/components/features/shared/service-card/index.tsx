"use client";

import { UserProps } from "@/components/features/helpers/interfaces/user-props";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useServiceStore } from "../store/service-store";

export default function ServiceCard({ user }: { user: UserProps }) {
  const session = useSession();
  const {addService} = useServiceStore()

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
      key={user.id}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16  rounded-full flex items-center justify-center mb-4 text-gray-500 border border-gray-200 text-2xl font-bold shadow-md">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {user.name}
        </h2>
        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {user.email}
        </span>
      </div>
      <div className="w-full flex justify-center gap-2 items-center mt-4">
        <Link href={`/service/${user.id}`}>
          <Button className="cursor-pointer bg-gray-500 hover:bg-gray-800">
            View
          </Button>
        </Link>
        {session.status === "authenticated" && (
          <Button variant="outline" className="cursor-pointer" onClick={()=>addService(user)}>
            <ShoppingBag />
          </Button>
        )}
      </div>
    </div>
  );
}
