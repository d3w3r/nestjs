import {
  IsOptional,
  IsNumber,
  IsPositive,
  Min,
  ValidateIf,
  ValidateNested,
  IsNotEmpty,
  IsMongoId,
} from 'class-validator';
import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

import { Product } from './../entities/products.entity';
import { Brand } from './../../brands/entities/brands.entity';
import { Category } from './../../categories/entities/categories.entity';
import { CreateCategoryDto } from './../../categories/dtos/categories.dto';

export class CreateProductDto extends OmitType(Product, ['id']) {
  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  category: CreateCategoryDto;

  @IsNotEmpty()
  @IsMongoId()
  brand: Types.ObjectId;
}
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
