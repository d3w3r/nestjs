import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as _ from 'lodash';

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
  constructor(
    private categoriesService: CategoriesService,
    private brandsService: BrandsService,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  private async _getBrand(id: number) {
    let brand;
    try {
      brand = await this.brandsService.getOne(id);
    } catch (err) {}

    return brand;
  }
  private async _findCategories(ids: number[]) {
    const availables = await this._getCategories(ids);
    const parsed = availables.map((c) => c.id);

    const common = _.intersection(ids, parsed);
    const different = _.xor(ids, parsed);

    return { found: common, notFound: different };
  }
  private async _getCategories(ids: number[]) {
    const categories = [];

    ids.forEach((c) => {
      try {
        const category = this.categoriesService.getOne(c);
        categories.push(category);
      } catch (err) {}
    });

    const resolved = await Promise.allSettled(categories);
    const parsed = resolved
      .map((r: PromiseFulfilledResult<any>) => r.value)
      .filter((r) => r);

    return parsed;
  }
  private async _getFullInfo(products: Product[]) {
    const response = products.map(async (p) => {
      const { brand, categories, ...copied } = p;

      // const brandA: Brand = await this._getBrand(brand);
      // const categories: Category[] = await this._getCategories(categoriesID);

      // return { ...copied, brandA, categories };
    });

    const results = await Promise.allSettled(response);
    const parsed = results.map((r: PromiseFulfilledResult<any>) => r.value);

    return parsed;
  }

  async findAllById(ids: number[]) {
    const products = await this.productRepo.findBy({ id: In(ids) });

    if (products.length === 0)
      throw new NotFoundException(`Products not found`);

    return products;
  }
  async findAll(
    verbose: boolean,
    limit: number,
    offset: number,
  ): Promise<ReviewProductDto[] | Product[]> {
    if (verbose) {
      const products = await this.productRepo.find({
        skip: offset,
        take: limit,
        relations: ['brand', 'categories'],
      });

      if (products.length === 0)
        throw new NotFoundException('There is not any products stored');

      return products;
    } else {
      const products = await this.productRepo.find({
        skip: offset,
        take: limit,
      });

      if (products.length === 0)
        throw new NotFoundException('There is not any products stored');

      return products;
    }
  }
  async findOne(
    id: number,
    verbose: boolean,
  ): Promise<ReviewProductDto | Product> {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) throw new NotFoundException(`Product #${id} not found`);

    if (verbose) {
      const product = await this.productRepo.findOne({
        where: { id },
        relations: ['brand', 'categories'],
      });

      if (product === undefined)
        throw new NotFoundException(`Product #${id} not found`);

      return product;
    } else {
      const product = await this.productRepo.findOne({ where: { id } });

      if (product === undefined)
        throw new NotFoundException(`Product #${id} not found`);

      return product;
    }
  }
  async create(payload) {
    const { brand: brandId, categories: categoriesId } = payload;

    const brandObj = await this.brandsService.getOne(brandId);
    const categoriesObj = await this.categoriesService.getAllById(categoriesId);

    if (!brandObj) {
      throw new NotFoundException(
        `Brand ${payload.brandId} not found and cannot be assigned to the new Product`,
      );
    }
    if (categoriesObj.length === 0) {
      throw new NotFoundException(
        `Categories ${payload.categoriesId} not found and cannot be assigned to the new Product`,
      );
    }

    payload.brand = brandObj;
    payload.categories = categoriesObj;

    const product = this.productRepo.create(payload);
    return this.productRepo.save(product);
  }
  async update(id: number, payload: UpdateProductDto) {
    const { categories } = payload;

    const product = await this.findOne(id, false);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    // const { found, notFound } = await this._findCategories(ids);
    // if (found.length === 0)
    //   throw new NotFoundException(
    //     `None of the categories exist in the data ${notFound.toString()}`,
    //   );

    // const newPayload = {
    //   ...payload,
    //   categoriesID: found,
    // };

    // return this.productRepo.update(id, newPayload);
    return {};
  }
  async modify(id: number, payload: ModifyProductDto) {
    const product = await this.findOne(id, false);

    if (!product) throw new NotFoundException(`Product ${id} not found`);

    if ('brandId' in payload) {
      const brandN = await this.brandsService.getOne(payload.brandId);

      if (!brandN) {
        throw new NotFoundException(
          `Brand ${payload.brandId} not found and cannot be assigned to Product ${id} `,
        );
      }

      payload.brand = brandN;
    }
    if ('categoriesId' in payload) {
      const categoriesN = await this.categoriesService.getAllById(
        payload.categoriesId,
      );

      if (categoriesN.length === 0) {
        throw new NotFoundException(
          `Categories ${payload.categoriesId} not found and cannot be assigned to Product ${id} `,
        );
      }

      payload.categories = categoriesN;
    }

    const productM = this.productRepo.merge(product as Product, payload);
    const productS = await this.productRepo.save(productM);

    return productS;
  }
  async remove(id: number) {
    const product = await this.findOne(id, null);
    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return this.productRepo.delete(id);
  }
}
