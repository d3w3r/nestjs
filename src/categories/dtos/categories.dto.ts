import { OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive, Min } from 'class-validator';

import { Category } from './../entities/categories.entity';

export class CreateCategoryDto extends OmitType(Category, ['id']) {}
export class UpdateCategoryDto extends CreateCategoryDto {}
export class ModifyCategoryDto extends PartialType(CreateCategoryDto) {}
export class FilterCategoryDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly limit: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number = 0;
}
