import { OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, IsPositive } from 'class-validator';

import { User } from '../entities/users.entity';
import { Customer } from './../../customers/entities/customers.entity';

export class CreateUserDto extends OmitType(User, ['id']) {}
export class UpdateUserDto extends CreateUserDto {}
export class PatchUserDto extends PartialType(CreateUserDto) {}
export class ReviewUserDto extends OmitType(User, ['customerID']) {
  readonly customer: Customer;
}
export class FilterUserDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly limit: number = 10;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly offset: number = 0;
}
