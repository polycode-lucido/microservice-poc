import {
  InsufficientStockError,
  Inventory,
  Product,
  ProductAlreadyExistsError,
  ProductNotFoundError,
  Stock,
  StockNotFoundError,
} from '@microservice-poc/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockProviderService {
  private readonly products: { [name: string]: Product } = {
    phone: {
      id: 0,
      name: 'phone',
      price: 100,
    },
    computer: {
      id: 1,
      name: 'computer',
      price: 500,
    },
    tv: {
      id: 2,
      name: 'tv',
      price: 300,
    },
    watch: {
      id: 3,
      name: 'watch',
      price: 150,
    },
  };

  private readonly inventory: Inventory = Object.keys(this.products).map(
    (name) => ({
      product: this.products[name],
      quantity: Math.floor(Math.random() * 10),
    })
  );

  getInventory(): Inventory {
    return this.inventory;
  }

  getStock(name: string): Stock {
    const stock = this.inventory.find((stock) => stock.product.name === name);
    if (!stock) {
      throw new StockNotFoundError(name);
    }
    return stock;
  }

  getProduct(name: string): Product {
    const product = this.products[name];
    if (!product) {
      throw new ProductNotFoundError(name);
    }
    return product;
  }

  addStock(name: string, quantity: number): number {
    quantity = +quantity;
    const stock = this.getStock(name);
    if (!stock) {
      throw new StockNotFoundError(name);
    }
    if (stock.quantity + quantity < 0) {
      throw new InsufficientStockError(
        stock.quantity,
        stock.quantity + quantity
      );
    }
    stock.quantity += quantity;
    return stock.quantity;
  }

  addProduct(product: Product): Product {
    if (this.products[product.name]) {
      throw new ProductAlreadyExistsError(product.name);
    }
    this.products[product.name] = product;
    this.inventory.push({
      product,
      quantity: 0,
    });
    return product;
  }
}
