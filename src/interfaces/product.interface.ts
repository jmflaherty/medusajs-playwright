import { rand } from "@ngneat/falso";
import { productTypes } from "../types/product.type";
import { Size, sizeTypes } from "../types/size.type";

export interface ProductInterface {
  name: string;
  price: number;
  size: Size | null;
  amountToBuy: number;
}

export const productGenerator = () => {
  const product = rand(productTypes) as ProductInterface;
  return {
    ...product,
    ...{
      size: product.name == "Medusa Coffee Mug" ? "" : rand(sizeTypes),
      amountToBuy: Math.floor(Math.random() * (5 - 1 + 1) + 1)
    }
  };
};
