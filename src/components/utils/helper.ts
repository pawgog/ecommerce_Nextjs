import { Product } from "@/db/schema";

export const calculateTotalAmount = (data: Product[]) => {
  return data.reduce((sum, item) => sum + item.price, 0);
}