import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './../entities/categories.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  ModifyCategoryDto,
} from './../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  /*
  private _getIndex(id: number) {
    return this.categories.findIndex((c) => c.id === id);
  }
  private _updateCounter() {
    this.counter++;
  }
  */

  async getAll(limit: number, offset: number) {
    const list = await this.categoryRepo.find({ take: limit, skip: offset });

    if (!list.length) throw new NotFoundException(`Categories not found`);

    return list;
  }
  async getOne(id: number) {
    const category = await this.categoryRepo.find({ where: { id } });

    if (!category) throw new NotFoundException(`Category ${id} not found`);

    return category[0];
  }
  /*
  createOne(payload: CreateCategoryDto) {
    const categoryNew: Category = {
      id: this.counter,
      ...payload,
    };
    this.categories.push(categoryNew);
    this._updateCounter();

    return categoryNew;
  }
  updateOne(id: number, payload: UpdateCategoryDto) {
    const index = this._getIndex(id);
    const categoryOld = this.getOne(id);
    if (!categoryOld) throw new NotFoundException(`Category ${id} not found`);

    const categoryUpdated: Category = {
      id: categoryOld.id,
      ...payload,
    };
    this.categories[index] = categoryUpdated;

    return categoryUpdated;
  }
  modifyOne(id: number, payload: ModifyCategoryDto) {
    const index = this._getIndex(id);
    const categoryOld = this.getOne(id);
    if (!categoryOld) throw new NotFoundException(`Category ${id} not found`);

    const categoryModified = {
      ...categoryOld,
      ...payload,
    };
    this.categories[index] = categoryModified;

    return categoryModified;
  }
  removeOne(id: number) {
    const amount = 1;
    const index = this._getIndex(id);
    if (index === -1) throw new NotFoundException(`Category ${id} not found`);

    return this.categories.splice(index, amount);
  }
  */
}
