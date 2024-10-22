"use client";

import { Shield } from "lucide-react";

import { Product } from "@/db/schema";

import { addProductToCart } from "@/actions/productActions";
import { Button } from "./ui/button";
import { staticText } from "./utils/staticText";

interface AddButtonProps {
  product: Product;
}

const AddButton = ({ product }: AddButtonProps) => {
  const handleAddProduct = async () => {
    await addProductToCart(product);
  };

  return (
    <>
      <Button onClick={handleAddProduct} className="w-full mt-10">
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

export default AddButton;
