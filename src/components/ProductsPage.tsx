"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/db/schema";

interface ProductsPageProps {
  products: Product[];
}

const ProductsPage = ({ products }: ProductsPageProps) => {
  return (
    <ul className="py-4 divide-y divide-zinc-100 bg-white shadow-md rounded-b-md">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <li className="mx-auto py-4 px-8 flex space-x-4">
            <div className="relative flex items-center bg-zinc-100 rounded-lg w-40 h-40">
              <Image
                src={`/${product.imgId}`}
                loading="eager"
                fill
                alt="product-img"
              />
            </div>
            <div className="w-full flex-1 space-y-2 py-1">
              <h1 className="text-lg font-medium text-gray-900">
                {product.name}
              </h1>
              <p className="prose prose-sm text-gray-500 line-clamp-3">
                {product.description}
              </p>
              <p className="text-base font-medium text-gray-900">
                {product.price.toFixed(2)}€
              </p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ProductsPage;
