import Cart from "@/components/Cart";
import { getProductsCart } from "@/actions/productActions";

const CartPage = async () => {
  const productsCart = await getProductsCart();

  return <Cart products={productsCart} />;
};

export default CartPage;
