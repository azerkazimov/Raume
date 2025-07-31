import { MaterialProps } from "@/components/helpers/interfaces/material-props";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Materials() {
  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/materials");
  const materials = await response.json();
  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((material: MaterialProps) => (
          <Link key={material.id} href={`/materials/${material.href}`}>
            <div
              key={material.id}
              className="flex flex-col gap-4 bg-white rounded-lg p-4 border border-gray-200"
            >
              <h2 className="text-lg font-bold">{material.name}</h2>
              <p>{material.description}</p>
              <div className="flex justify-between">
                <p>{material.price}</p>
                <p>{material.category}</p>
              </div>
              <div className="flex justify-end">
                <Link
                  href={`/materials/${material.href}`}
                  className="group text-sm text-gray-500 hover:underline flex gap-2 items-center"
                >
                  <span>Show more</span>
                  <ArrowRightIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-[5px]" />
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
