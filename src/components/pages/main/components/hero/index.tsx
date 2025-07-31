import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/ui/section-header";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <div className="bg-[rgb(196,196,196)] w-full flex justify-center items-center lg:min-h-[580px] md:items-end overflow-hidden">
        <SectionHeader title="INTERIOR" />
      </div>
      <div className="py-[100px] border-b border-black/10">
        <div className="container grid grid-cols-1 md:grid-cols-3 mt-6 text-center md:text-left gap-4 ">
          <div className="text-md">
            <span>[Minimal]</span>
          </div>
          <div className="text-md">
            <span>[Modern]</span>
          </div>
          <div className="text-md">
            <span>[Smart Spaces]</span>
          </div>
        </div>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 mt-12 gap-8">
            <div className="flex flex-col max-w-[689px]">
              <div className="flex">
                <h2 className="text-center md:text-left text-[64px]/[80px] font-light  font-montserrat tracking-[3px] ">
                  Beautifully Arranged
                </h2>
              </div>
              <div className="flex flex-col gap-12 justify-center items-center pr-[50px] md:flex-row md:justify-between">
                <h2 className="text-center md:text-left text-[64px]/[80px] font-light font-montserrat tracking-[3px] ">
                  Smart Spaces.
                </h2>
                <div className="w-[46.67px] h-[46.67px] flex justify-center items-center border border-black rounded-full p-2">
                  <ArrowLeft />
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center md:justify-end">
              <div className="max-w-[361px] flex flex-col gap-[18px] items-center justify-center md:items-start md:justify-center">
                <span className="text-center md:text-left  text-[16px]">
                  Combining aesthetics and innovation, we design interiors that
                  are both beautiful and brilliantly functional—ideal for modern
                  living.
                </span>
                <Link href="/materials">
                  <Button className="rounded-full cursor-pointer">
                    Explore Design
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
