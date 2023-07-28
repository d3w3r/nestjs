import { Injectable } from '@nestjs/common';

import { Brand } from './../../entities/brands.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
  ModifyBrandDto,
} from './../../dtos/brands.dto';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];
  private counter: number;

  private getIndex(id: number) {
    return this.brands.findIndex((b) => b.id === id);
  }

  getAll(limit: number, offset: number) {
    const end = limit + offset;
    return this.brands.slice(offset, end);
  }
  getOne(id: number) {
    return this.brands.find((b) => b.id === id);
  }
  createOne(payload: CreateBrandDto) {
    const brandNew = {
      id: this.counter,
      ...payload,
    };
    this.brands.push(brandNew);
    this.counter++;

    return brandNew;
  }
  updateOne(id: number, payload: UpdateBrandDto) {
    const index = this.getIndex(id);
    const brandUpdate = {
      id,
      ...payload,
    };
    this.brands[index] = brandUpdate;

    return brandUpdate;
  }
  modifyOne(id: number, payload: ModifyBrandDto) {
    const index = this.getIndex(id);
    const brand = this.brands[index];
    const brandModified = {
      ...brand,
      ...payload,
    };
    this.brands[index] = brandModified;

    return brandModified;
  }
  removeOne(id: number) {
    const TO_REMOVE = 1;
    const index = this.getIndex(id);

    return this.brands.splice(index, TO_REMOVE);
  }
}
