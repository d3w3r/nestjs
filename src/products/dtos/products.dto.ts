// import { PartialType, OmitType } from '@nestjs/mapped-types';
import { PartialType, OmitType } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsArray, IsOptional } from 'class-validator';

import { Product } from './../entities/products.entity';
import { Brand } from './../../brands/entities/brands.entity';
import { Category } from './../../categories/entities/categories.entity';

export class CreateProductDto extends OmitType(Product, ['id']) {}
export class UpdateProductDto extends CreateProductDto {}
export class ModifyProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly brandId?: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly categoriesId?: number[];
}
export class ReviewProductDto extends OmitType(Product, [
  'brand',
  // 'categoriesID',
]) {
  readonly brand: Brand;
  readonly categories: Category[];
}
