"use client";

import { useState } from "react";
import { Shield } from "lucide-react";

import { Product } from "@/db/schema";

import { addProductToCart } from "@/actions/productActions";
import { Button } from "./ui/button";
import { staticText } from "./utils/staticText";

interface AddProductProps {
  product: Product;
}

const AddProduct = ({ product }: AddProductProps) => {
  const [productCart, setProductCart] = useState<Product[]>([]);

  const handleAddProductToCart = async () => {
    await addProductToCart(product);
    setProductCart((prev: Product[]) => [...prev, product]);
  };

  return (
    <>
      <Button onClick={handleAddProductToCart} className="w-full mt-10">
        {staticText.addToCart}
      </Button>
      <div className="mt-6 text-center">
        <div className="inline-flex text-sm text-medium">
          <Shield className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400" />
          <span className="text-muted-foreground hover:text-gray-700">
            {staticText.returnPolicy}
          </span>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
