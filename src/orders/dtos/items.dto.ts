import { OmitType } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

import { Items } from './../entities/items.entity';

export class CreateItemDto extends OmitType(Items, [
  'id',
  'createdAt',
  'updatedAt',
]) {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  orderId: number;
}
