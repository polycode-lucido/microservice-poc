import { Inventory, Product, Stock } from '@microservice-poc/entities';
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
    return this.inventory.find((stock) => stock.product.name === name);
  }

  getProduct(name: string): Product {
    return this.products[name];
  }
}
