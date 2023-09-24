import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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
  FilterProductDto,
} from './../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    private categoriesService: CategoriesService,
    private brandsService: BrandsService,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll(filter: FilterProductDto) {
    const { limit, offset } = filter;
    return this.productModel
      .find()
      .skip(offset as number)
      .limit(limit as number)
      .exec();
  }
  findOne(id: string, verbose: boolean) {
    return this.productModel.findById(id).exec();
  }
  create(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }
  update(id: string, payload: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return product;
  }
  modify(id: string, payload: ModifyProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!product) throw new NotFoundException(`Product ${id} not found`);

    return product;
  }
  async remove(id: string) {
    const productDeleted = await this.productModel.findByIdAndDelete(id);

    return productDeleted;
  }
}
