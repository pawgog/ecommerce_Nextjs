import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { staticText } from "@/components/utils/staticText";

import { db } from "@/db";
import { productTable } from "@/db/schema";
import { sql } from "drizzle-orm";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { query } = searchParams;

  if (Array.isArray(query) || !query) {
    redirect("/");
  }

  let products = await db
    .select()
    .from(productTable)
    .where(
      sql`to_tsvector('simple', lower(${productTable.name} || ' ' || ${
        productTable.description
      })) @@ to_tsquery('simple', lower(${query
        .trim()
        .split(" ")
        .join(" & ")}))`
    )
    .limit(5);

  if (products.length === 0) {
    return (
      <div className="text-center py-4 bg-white shadow-md rounded-b-md">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          {staticText.noResults}
        </h3>
        <p className="mt-1 text-sm mx-auto max-w-prose text-gray-500">
          {staticText.noFindProduct}{" "}
          <span className="font-medium text-red-600">{query}</span>
        </p>
      </div>
    );
  }

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

export default Page;
