import {
  IsDate,
  IsEmpty,
  IsNumber,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';
import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Order } from './orders.entity';
import { Product } from '../../products/entities/products.entity';

@Entity()
export class Item {
  @IsEmpty()
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador del registro' })
  readonly id: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Order, (order) => order.item)
  order: Order;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int' })
  @ApiProperty({ description: 'Cantidad de items del product' })
  readonly quantity: number;

  @IsDate()
  @IsEmpty()
  @CreateDateColumn({ type: 'timetz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'Fecha de ultima actualizacion del registro' })
  readonly updatedAt: Date;

  @IsDate()
  @IsEmpty()
  @CreateDateColumn({ type: 'timetz', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({ description: 'Fecha de la creacion del registro' })
  readonly createdAt: Date;
}
