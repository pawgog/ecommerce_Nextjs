import { db } from "@/db";
import { productTable } from "@/db/schema";
import ProductsPage from "@/components/ProductsPage";

const Products = async () => {
  let products = await db.select().from(productTable);

  return <ProductsPage products={products} />;
};

export default Products;
