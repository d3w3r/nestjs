import { OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive, Min } from 'class-validator';

import { Customer } from './../entities/customers.entity';

export class CreateCustomerDto extends OmitType(Customer, ['id']) {}
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
