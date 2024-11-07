import ProductsPage from "@/components/ProductsPage";
import { getAllProducts } from "@/actions/productActions";

const Products = async () => {
  const products = await getAllProducts();

  return <ProductsPage products={products} />;
};

export default Products;
