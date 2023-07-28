import { Injectable } from '@nestjs/common';

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
    return this.categories.slice(offset, end);
  }
  getOne(id: number) {
    return this.categories.find((c) => c.id === id);
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

    if (!categoryOld || !index) return undefined;

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

    if (!index || !categoryOld) return undefined;

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
    return this.categories.splice(index, amount);
  }
}
