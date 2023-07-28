import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from './../../entities/categories.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  ModifyCategoryDto,
} from './../../dtos/categories.dto';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];
  private counter = 1;

  private _getIndex(id: number) {
    return this.categories.findIndex((c) => c.id === id);
  }
  private _updateCounter() {
    this.counter++;
  }

  getAll(limit: number, offset: number) {
    const end = offset + limit;
    const list = this.categories.slice(offset, end);
    if (list.length === 0) throw new NotFoundException(`Categories not found`);

    return list;
  }
  getOne(id: number) {
    const category = this.categories.find((c) => c.id === id);
    if (!category) throw new NotFoundException(`Category ${id} not found`);

    return category;
  }
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
}
