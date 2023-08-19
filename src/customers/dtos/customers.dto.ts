// import { OmitType, PartialType } from '@nestjs/mapped-types';
import { OmitType, PartialType } from '@nestjs/swagger';

import { Customer } from './../entities/customers.entity';

export class CreateCustomerDto extends OmitType(Customer, ['id']) {}
export class UpdateCustomerDto extends CreateCustomerDto {}
export class ModifyCustomerDto extends PartialType(CreateCustomerDto) {}

// export type CreateCustomerDto = Readonly<Omit<Customer, 'id'>>;
// export type UpdateCustomerDto = CreateCustomerDto;
// export type ModifyCustomerDto = Partial<CreateCustomerDto>;
