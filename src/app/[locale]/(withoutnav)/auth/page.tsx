import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl">Auth</h1>
      <Link href="/auth/signup" className="w-full text-center">
        <Button>Sign Up</Button>
      </Link>
      <Link href="/auth/signin" className="w-full text-center">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
}
