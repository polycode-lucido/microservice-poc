import { Product } from './product.interface';

export type Stock = {
  product: Product;
  quantity: number;
};

export type Inventory = Stock[];
