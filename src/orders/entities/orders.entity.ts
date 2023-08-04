import { Product } from './../../products/entities/products.entity';
import { Customer } from './../../customers/entities/customers.entity';

import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class Item {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly index: number;

  readonly product: Product;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly quantity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly total: number;
}

export class Order {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;

  readonly client: Customer;
  readonly products: Item[];

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly total: number;
}

// export interface Order {
//   id: number;
//   client: Customer;
//   products: Item[];
//   total: number;
// }
