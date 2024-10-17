"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { Product, productsCart } from "@/db/schema";

export const getProductsCart = async () => {
  const data = await db.select().from(productsCart);
  return data;
};

export const addProductToCart = async (product: Product) => {
  await db.insert(productsCart).values(product);
  revalidatePath("/");
};