import { rand } from "@ngneat/falso";
import { Product, productTypes } from "../types/product.type";
import { Size, sizeTypes } from "../types/size.type";

export interface ProductInterface {
  name: string;
  price: number;
  size: Size | null;
  amountToBuy: number;
}

export function generateProduct(): Product {
  const product = rand(productTypes) as ProductInterface;
  return {
    ...product,
    ...{
      size: product.name == "Medusa Coffee Mug" ? null : rand(sizeTypes),
      amountToBuy: Math.floor(Math.random() * (5 - 1 + 1) + 1)
    }
  };
}

export function generateProducts(
  amountOfProducts: number,
  unique = true
): Array<Product> {
  const products = new Array<Product>();
  do {
    let newProduct = generateProduct();
    if (unique) {
      while (
        products.find((item) => {
          return item.name == newProduct.name;
        })
      ) {
        newProduct = generateProduct();
      }
      products.push(newProduct);
    }
  } while (products.length != amountOfProducts);
  return products;
}
