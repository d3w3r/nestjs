import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from './../entities/brands.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
  ModifyBrandDto,
  FilterBrandDto,
} from './../dtos/brands.dto';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async getAll(params: FilterBrandDto) {
    const { limit, offset } = params;

    const brands = await this.brandModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();
    if (brands.length === 0) throw new NotFoundException(`Brands not found`);

    return brands;
  }
  async getOne(id: Brand['id']) {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) throw new NotFoundException(`Brand ${id} not found`);

    return brand;
  }
  async createOne(payload: CreateBrandDto) {
    const toCreate = new this.brandModel(payload);
    const brand = await toCreate.save();

    return brand;
  }
  async updateOne(id: Brand['id'], payload: UpdateBrandDto) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!brand) throw new NotFoundException(`Brand ${id} not found`);

    return brand;
  }
  async modifyOne(id: Brand['id'], payload: ModifyBrandDto) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!brand) throw new NotFoundException(`Brand ${id} not found`);

    return brand;
  }
  async removeOne(id: Brand['id']) {
    const brand = await this.brandModel.findByIdAndDelete(id).exec();
    if (!brand) throw new NotFoundException(`Brand ${id} not found`);

    return brand;
  }
}
