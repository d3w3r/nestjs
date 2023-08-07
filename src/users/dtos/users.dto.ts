import { OmitType, PartialType } from '@nestjs/mapped-types';

import { User } from '../entities/users.entity';
import { Customer } from './../../customers/entities/customers.entity';

export class CreateUserDto extends OmitType(User, ['id']) {}
export class UpdateUserDto extends CreateUserDto {}
export class PatchUserDto extends PartialType(CreateUserDto) {}
export class ReviewUserDto extends OmitType(User, ['customerID']) {
  readonly customer: Customer;
}
