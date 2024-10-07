import BackButton from "@/components/BackButton";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

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
      </div>
    </div>
  );
};

export default Product;
