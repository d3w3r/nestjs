import { Order } from './../entities/orders.entity';

import { OmitType, PartialType } from '@nestjs/mapped-types';

export class CreateOrderDto extends OmitType(Order, ['id']) {}
export class UpdateOrderDto extends CreateOrderDto {}
export class ModifyOrderDto extends PartialType(CreateOrderDto) {}

// export type CreateOrderDto = Readonly<Omit<Order, 'id'>>;
// export type UpdateOrderDto = CreateOrderDto;
// export type ModifyOrderDto = Partial<CreateOrderDto>;
