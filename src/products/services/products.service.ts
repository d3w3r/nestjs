import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/products.entity';
import { Brand } from './../../brands/entities/brands.entity';
import { Category } from './../../categories/entities/categories.entity';
import { BrandsService } from './../../brands/services/brands.service';
import { CategoriesService } from './../../categories/services/categories.service';
import {
  CreateProductDto,
  UpdateProductDto,
  ModifyProductDto,
  ReviewProductDto,
} from './../dtos/products.dto';

@Injectable()
export class ProductsService {
  private counter = 1;
  private products: Product[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private brandsService: BrandsService,
  ) {}

  private _increaseCounter() {
    this.counter++;
  }
  private _getBrand(id: number): Brand {
    let brand: Brand | undefined;
    try {
      brand = this.brandsService.getOne(id);
    } catch (err) {}

    return brand;
  }
  private _getCategories(ids: number[]): Category[] {
    const categories: Category[] = [];

    ids.forEach((c) => {
      try {
        const category = this.categoriesService.getOne(c);
        categories.push(category);
      } catch (err) {}
    });

    return categories;
  }
  private _getFullInfo(products: Product[]): ReviewProductDto[] {
    const response: ReviewProductDto[] = products.map((p) => {
      const { brandID, categoriesID, ...copied } = p;

      const brand: Brand = this._getBrand(brandID);
      const categories: Category[] = this._getCategories(categoriesID);

      return { ...copied, brand, categories };
    });

    return response;
  }

  findAll(verbose: boolean) {
    let products: Product[] | ReviewProductDto[] = this.products;
    if (products.length === 0)
      throw new NotFoundException(`Products not found`);

    if (verbose) products = this._getFullInfo(products);

    return products;
  }
  findOne(id: number, verbose: boolean) {
    let product: Product | ReviewProductDto = this.products.find(
      (p) => p.id === id,
    );
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    if (verbose) [product] = this._getFullInfo([product]);

    return product;
  }
  create(payload: CreateProductDto) {
    const newProduct = {
      id: this.counter,
      ...payload,
    };

    const { categoriesID, brandID } = payload;
    const categories = this._getCategories(categoriesID);
    const brand = this._getBrand(brandID);

    if (!brand) throw new NotFoundException('The provided Brand was not found');
    if (categories.length === 0)
      throw new NotFoundException('None of the categories exist in the data');

    this.products.push(newProduct);
    this._increaseCounter();

    return newProduct;
  }
  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id, false);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    if (product) {
      const index = this.products.findIndex((e) => e.id === id);
      this.products[index] = payload as Product;

      return product;
    }
    return null;
  }
  modify(id: number, payload: ModifyProductDto) {
    // Sera un producto siempre debido a que se envia en falso la bandera verbosa
    const product = this.findOne(id, false) as Product;
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
