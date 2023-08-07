import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from './../entities/brands.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
  ModifyBrandDto,
} from './../dtos/brands.dto';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];
  private counter = 1;

  private getIndex(id: number) {
    return this.brands.findIndex((b) => b.id === id);
  }

  getAll(limit: number, offset: number) {
    const end = limit + offset;
    const list = this.brands.slice(offset, end);
    if (!list) throw new NotFoundException('Brands not found');

    return list;
  }
  getOne(id: number) {
    const brand = this.brands.find((b) => b.id === id);
    if (!brand) throw new NotFoundException(`Brand ${id} not found`);

    return brand;
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
    if (index === -1) throw new NotFoundException(`Brand ${id} not found`);

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
    if (!brand) throw new NotFoundException(`Brand ${id} not found`);

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
    if (index === -1) throw new NotFoundException(`Brand ${id} not found`);

    return this.brands.splice(index, TO_REMOVE);
  }
}
