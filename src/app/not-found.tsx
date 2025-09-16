import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Image src="/not-found.jpg" alt="not found" width={500} height={500} />
      <h1 className="text-4xl font-bold">Back to Home</h1>
      <Link href="/">
        <Button className="hover:scale-105 transition-all duration-300 cursor-pointer">
          <ArrowLeft />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
