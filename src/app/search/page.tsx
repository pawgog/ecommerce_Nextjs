import { redirect } from "next/navigation";

import { staticText } from "@/components/utils/staticText";

import { db } from "@/db";
import { productTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import ProductsPage from "@/components/ProductsPage";

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

  return <ProductsPage products={products} />;
};

export default Page;
