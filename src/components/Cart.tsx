"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";

import { Product } from "@/db/schema";

import { staticText } from "./utils/staticText";
import { calculateTotalAmount } from "./utils/helper";

interface CartProps {
  products: Product[];
}

const Cart = ({ products }: CartProps) => {
  const totalAmount = calculateTotalAmount(products);

  return (
    <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:bg-gray-50 dark:text-gray-800">
      <h2 className="text-xl font-semibold">{staticText.shoppingCart}</h2>
      <ul className="flex flex-col divide-y dark:divide-gray-300">
        {products.map(({ id, imgId, name, description, price }) => (
          <li
            key={id}
            className="flex flex-col py-6 sm:flex-row sm:justify-between"
          >
            <div className="flex w-full space-x-2 sm:space-x-4">
              <Image
                width={50}
                height={50}
                loading="eager"
                className="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                src={`/${imgId}`}
                alt={name}
              />
              <div className="flex flex-col justify-between w-full pb-4">
                <div className="flex justify-between w-full pb-2 space-x-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                      {name}
                    </h3>
                    <p className="text-sm dark:text-gray-600">{description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{price}€</p>
                  </div>
                </div>
                <div className="flex text-sm divide-x">
                  <button className="flex items-center px-2 py-1 pl-0 space-x-1">
                    <Trash2 />
                    <span>{staticText.remove}</span>
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="space-y-1 text-right">
        <p>
          {staticText.totalAmount}
          <span className="font-semibold"> {totalAmount}€</span>
        </p>
        <p className="text-sm dark:text-gray-600">{staticText.taxInfo}</p>
      </div>
      <div className="flex justify-end space-x-4">
        <button className="px-6 py-2 border rounded-md dark:bg-violet-600 dark:text-gray-50 dark:border-violet-600">
          <span>{staticText.checkout}</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
