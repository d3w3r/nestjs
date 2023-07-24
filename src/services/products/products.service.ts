import { Injectable } from '@nestjs/common';

import { Product } from './../../entities/products.entity';

@Injectable()
export class ProductsService {
  private counter = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'product 1',
      description: 'bla bla',
      price: 122,
      stock: 1283,
      image: 'http://localhost:3000/images/cat.png',
    },
  ];

  findAll() {
    return this.products;
  }
  findOne(id: number) {
    return this.products.find((e) => e.id === id);
  }
  create(payload: unknown) {
    this.counter++;

    if (typeof payload === 'object') {
      const newProduct = {
        id: this.counter,
        ...payload,
      };

      this.products.push(newProduct as Product);
    }
  }
  update(id: number, payload: unknown) {
    const product = this.findOne(id);

    if (product) {
      const index = this.products.findIndex((e) => e.id === id);
      this.products[index] = payload as Product;

      return product;
    }
    return null;
  }
  modify(id: number, payload: unknown) {
    const product = this.findOne(id);

    if (product && typeof payload === 'object') {
      const index = this.products.findIndex((e) => e.id === id);
      const update = {
        ...product,
        ...payload,
      };
      this.products[index] = update;
      return update;
    }
    return null;
  }
  remove(id: number) {
    const index = this.products.findIndex((e) => e.id === id);
    return this.products.splice(index, 1);
  }
}
