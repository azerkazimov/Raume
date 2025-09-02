import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: { href: string };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/materials/products/${params.href}`
  );
  const product = await response.json();

  return (
    <div className="container my-12">
      <div className="w-full bg-white rounded-lg p-6 border border-gray-200 space-y-6">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700">{product.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Price:</strong> ${product.price}
          </div>
          <div>
            <strong>Category:</strong> {product.category}
          </div>
          <div>
            <strong>Material:</strong> {product.material}
          </div>
          <div>
            <strong>Color:</strong> {product.color}
          </div>
          <div>
            <strong>Size:</strong> {product.size}
          </div>
          <div>
            <strong>Weight:</strong> {product.weight} kg
          </div>
          <div>
            <strong>Dimensions:</strong> {product.dimensions}
          </div>
          <div>
            <strong>Warranty:</strong> {product.warranty}
          </div>
        </div>

        <div className="pt-4 flex justify-start">
          <Link
            href="/materials"
            className="group text-sm text-gray-500 hover:underline flex gap-2 items-center"
          >
            <ArrowLeftIcon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-[5px]" />
            <span>Back to materials</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
