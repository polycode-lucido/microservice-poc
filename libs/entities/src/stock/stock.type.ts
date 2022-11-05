import { Product } from './product.class';

export type Stock = {
  product: Product;
  quantity: number;
};

export type Inventory = Stock[];
