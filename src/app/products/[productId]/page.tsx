import Image from "next/image";
import { notFound } from "next/navigation";

import BackButton from "@/components/BackButton";
import AddButton from "@/components/AddButton";

import { db } from "@/db";
import { productTable } from "@/db/schema";
import { eq } from "drizzle-orm";

interface ProductProps {
  params: {
    productId: string;
  };
}

const Product = async ({ params }: ProductProps) => {
  const { productId } = params;

  if (!productId) return notFound();

  const [product] = await db
    .select()
    .from(productTable)
    .where(eq(productTable.id, productId));

  if (!product) return notFound();

  return (
    <div className="py-8 pb-8 px-12 divide-y divide-zinc-100 bg-white shadow-md rounded-b-md">
      <div>
        <BackButton />

        <div className="mt-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {product.name}
          </h1>
        </div>

        <div className="aspect-square my-6 border border-border w-52 h-52">
          <div className="relative bg-zinc-100 w-full h-full overflow-hidden rounded-xl">
            <Image
              fill
              loading="eager"
              className="h-full w-full object-cover object-center"
              src={`/${product.imgId}`}
              alt="product image"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center">
            <p className="font-medium text-gray-900">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-4 space-y-6">
            <p className="text-base max-w-prose text-muted-foreground">
              {product.description}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <AddButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default Product;
