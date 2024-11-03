"use server";

import { revalidatePath } from "next/cache";
import { eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { Product, productsCart, productTable } from "@/db/schema";

export const getAllProducts = async () => {
  return await db.select().from(productTable);
}

export const getSingleProduct = async (productId: string) => {
  return await db.select().from(productTable).where(eq(productTable.id, productId));
}

export const getProductsCart = async () => {
  return await db.select().from(productsCart);
};

export const filterAllProducts = async (query: string) => {
  return await db.select().from(productTable)
  .where(
    sql`to_tsvector('simple', lower(${productTable.name} || ' ' || ${
      productTable.description
    })) @@ to_tsquery('simple', lower(${query
      .trim()
      .split(" ")
      .join(" & ")}))`
  ).limit(5);
}

export const addProductToCart = async (product: Product) => {
  await db.insert(productsCart).values(product);
  revalidatePath("/");
};