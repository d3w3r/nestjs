// import { PartialType, OmitType } from '@nestjs/mapped-types';
import { PartialType, OmitType } from '@nestjs/swagger';
import { IsOptional, IsDecimal } from 'class-validator';

import { Product } from './../entities/products.entity';
import { Brand } from './../../brands/entities/brands.entity';
import { Category } from './../../categories/entities/categories.entity';

export class CreateProductDto extends OmitType(Product, ['id']) {}
export class UpdateProductDto extends CreateProductDto {}
export class ModifyProductDto extends PartialType(CreateProductDto) {}
export class ReviewProductDto extends OmitType(Product, [
  'brandID',
  'categoriesID',
]) {
  readonly brand: Brand;
  readonly categories: Category[];
}
export class FilterProductDto {
  @IsOptional()
  readonly limit: string | number = 10;

  @IsOptional()
  readonly offset: string | number = 0;
}
