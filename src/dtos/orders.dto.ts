import { Order } from './../entities/orders.entity';

export type CreateOrderDto = Omit<Order, 'id'>;
export type UpdateOrderDto = CreateOrderDto;
export type ModifyOrderDto = Partial<CreateOrderDto>;
