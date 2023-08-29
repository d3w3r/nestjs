// import { OmitType, PartialType } from '@nestjs/mapped-types';
import { OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { Order } from './../entities/orders.entity';
import { Product } from './../../products/entities/products.entity';
import { User } from './../../users/entities/users.entity';

export class CreateOrderDto extends OmitType(Order, ['id', 'date']) {}
export class UpdateOrderDto extends CreateOrderDto {}
export class ModifyOrderDto extends PartialType(CreateOrderDto) {}
export class ReviewOrderDto extends OmitType(Order, ['userID', 'productsID']) {
  @IsNotEmpty()
  readonly user: User;

  @IsNotEmpty()
  readonly products: Product[];
}
