import { ProductInterface } from "../interfaces/product.interface";

export const productTypes: ProductInterface[] = [
  { name: "Medusa Coffee Mug", price: 10.0, size: "", amountToBuy: 0 },
  { name: "Medusa Hoodie", price: 36.5, size: "", amountToBuy: 0 },
  { name: "Medusa Longsleeve", price: 36.5, size: "", amountToBuy: 0 },
  { name: "Medusa Shorts", price: 25.0, size: "", amountToBuy: 0 },
  { name: "Medusa Sweatpants", price: 29.5, size: "", amountToBuy: 0 },
  { name: "Medusa T-Shirt", price: 19.5, size: "", amountToBuy: 0 }
];

export type Product = typeof productTypes[number];
