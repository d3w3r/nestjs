import { OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive, Min } from 'class-validator';

import { Brand } from './../entities/brands.entity';

export class CreateBrandDto extends OmitType(Brand, ['id']) {}
export class UpdateBrandDto extends CreateBrandDto {}
export class ModifyBrandDto extends PartialType(CreateBrandDto) {}
export class FilterBrandDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly limit: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number = 0;
}
