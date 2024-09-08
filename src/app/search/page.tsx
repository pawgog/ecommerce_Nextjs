import { db } from "@/db";
import { productTable } from "@/db/schema";
import { sql } from "drizzle-orm";
import { redirect } from "next/navigation";

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

  return <pre>{JSON.stringify(products)}</pre>;
};

export default Page;
