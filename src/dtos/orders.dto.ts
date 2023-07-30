import { Order } from './../entities/orders.entity';

export type CreateOrderDto = Readonly<Omit<Order, 'id'>>;
export type UpdateOrderDto = CreateOrderDto;
export type ModifyOrderDto = Partial<CreateOrderDto>;
