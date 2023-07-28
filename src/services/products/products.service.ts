import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../../entities/products.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  ModifyProductDto,
} from './../../dtos/products.dto';

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
    const products = this.products;
    if (products.length === 0)
      throw new NotFoundException(`Products not found`);

    return this.products;
  }
  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return product;
  }
  create(payload: CreateProductDto) {
    this.counter++;

    if (typeof payload === 'object') {
      const newProduct = {
        id: this.counter,
        ...payload,
      };

      this.products.push(newProduct as Product);
    }
  }
  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    if (product) {
      const index = this.products.findIndex((e) => e.id === id);
      this.products[index] = payload as Product;

      return product;
    }
    return null;
  }
  modify(id: number, payload: ModifyProductDto) {
    const product = this.findOne(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

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
    if (index === -1) throw new NotFoundException(`Product ${id} not found`);

    return this.products.splice(index, 1);
  }
}
