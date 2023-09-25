import {
  IsOptional,
  IsNumber,
  IsPositive,
  Min,
  IsNotEmpty,
  IsArray,
} from 'class-validator';
import { Types } from 'mongoose';
import { OmitType, PartialType } from '@nestjs/swagger';

import { Customer } from './../entities/customers.entity';

export class CreateCustomerDto extends OmitType(Customer, ['id']) {
  @IsNotEmpty()
  skills: any;
}
export class UpdateCustomerDto extends CreateCustomerDto {}
export class ModifyCustomerDto extends PartialType(CreateCustomerDto) {}
export class FilterCustomerDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly limit: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number = 0;
}
