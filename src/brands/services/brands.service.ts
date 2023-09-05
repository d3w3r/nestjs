import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from './../entities/brands.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
  ModifyBrandDto,
} from './../dtos/brands.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  // private getIndex(id: number) {
  //   return this.brands.findIndex((b) => b.id === id);
  // }

  async getAll(limit: number, offset: number) {
    const list = await this.brandRepo.find({ take: limit, skip: offset });

    if (!list.length) throw new NotFoundException('Brands not found');

    return list;
  }
  async getOne(id: number) {
    const brand = await this.brandRepo.find({ where: { id } });

    if (!brand) throw new NotFoundException(`Brand ${id} not found`);

    return brand[0];
  }
  async createOne(payload: CreateBrandDto) {
    const brandC = this.brandRepo.create(payload);
    const result = await this.brandRepo.save(brandC);

    return result;
  }
  /*
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
  */
  async removeOne(id: number) {
    const brandR = await this.getOne(id);

    if (!brandR) throw new NotFoundException(`Brand ${id} not found`);

    await this.brandRepo.remove(brandR);

    return brandR;
  }
}
