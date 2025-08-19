"use client";

import { useCounter } from "@/components/helpers/hooks/counter";
import { X } from "lucide-react";


export default function About() {
  const projects = useCounter({ limit: 126, speed: 70 });
  const client = useCounter({ limit: 926, speed: 10 });
  const material = useCounter({ limit: 364, speed: 25 });

  return (
    <div className="container py-[100px]">
      <div className="flex flex-col md:flex-row md:gap-[110px]">
        <div className="flex gap-2 items-center">
          <X size={24} />
          <span className="text-sm font-poppins w-max">About Us</span>
        </div>
        <div className="font-poppins max-w-[800px] ">
          <p className="text-[36px]">
            Our modern interiors reflect your lifestyle—creating beautiful,
            uniquely yours spaces. We design with heart and precision.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-[128px] mt-[92px] justify-between ">
        <div className="flex flex-col gap-4 items-center md:items-end">
          <div className="w-[303px] h-[257px] bg-[#c4c4c4]" />
          <span>[Minimal]</span>
        </div>
        <div className="flex max-w-[256px] font-light">
          <p className="text-[46px] tracking-wider">
            Designing Simplicity with Soul
          </p>
        </div>
        <div className="flex flex-col gap-[44px] px-[35px] w-[380px] ">
          <div className="flex w-full justify-end">
            <div className="w-[145px] h-[116px] bg-[#c4c4c4]" />
          </div>
          <div className="flex w-full justify-start">
            <div className="w-[196px] h-[162px] bg-[#c4c4c4]" />
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between mt-[100px]">
        <div className="flex flex-col">
          <span className="text-sm min-w-[300px]">Project</span>
          <p className="text-[96px]">
            <span>{projects}</span>+
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-sm min-w-[300px]">Client</span>
          <p className="text-[96px]">
            <span>{client}</span>+
          </p>
        </div>
        <div className="flex flex-col">
          <span className="text-sm min-w-[300px]">Material</span>
          <p className="text-[96px]">
            <span>{material}</span>+
          </p>
        </div>
      </div>
    </div>
  );
}
