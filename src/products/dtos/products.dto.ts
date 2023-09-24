import { PartialType, OmitType } from '@nestjs/swagger';
import {
  IsOptional,
  IsNumber,
  IsPositive,
  Min,
  ValidateIf,
} from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly minPrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ValidateIf((params) => params.minPrice)
  readonly maxPrice?: number;
}
