import { Customer } from './../entities/customers.entity';

export type CreateCustomerDto = Omit<Customer, 'id'>;
export type UpdateCustomerDto = CreateCustomerDto;
export type ModifyCustomerDto = Partial<CreateCustomerDto>;
