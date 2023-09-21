import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from './../entities/categories.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  ModifyCategoryDto,
} from './../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async getAll(limit: number, offset: number) {
    const categories = await this.categoryModel.find().exec();
    if (categories.length === 0)
      throw new NotFoundException(`Categories not found`);

    return categories;
  }
  async getOne(id: Category['id']) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) throw new NotFoundException(`Category ${id} not found`);

    return category;
  }
  async createOne(payload: CreateCategoryDto) {
    const toCreate = new this.categoryModel(payload);
    const category = await toCreate.save();

    return category;
  }
  async updateOne(id: Category['id'], payload: UpdateCategoryDto) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!category) throw new NotFoundException(`Category ${id} not found`);

    return category;
  }
  async modifyOne(id: Category['id'], payload: ModifyCategoryDto) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!category) throw new NotFoundException(`Category ${id} not found`);

    return category;
  }
  async removeOne(id: Category['id']) {
    const category = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) throw new NotFoundException(`Category ${id} not found`);

    return category;
  }
}
