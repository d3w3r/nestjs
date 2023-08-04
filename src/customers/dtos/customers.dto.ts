import { Customer } from './../entities/customers.entity';

import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto extends OmitType(Customer, ['id']) {}
export class UpdateCustomerDto extends CreateCustomerDto {}
export class ModifyCustomerDto extends PartialType(CreateCustomerDto) {}

// export type CreateCustomerDto = Readonly<Omit<Customer, 'id'>>;
// export type UpdateCustomerDto = CreateCustomerDto;
// export type ModifyCustomerDto = Partial<CreateCustomerDto>;
