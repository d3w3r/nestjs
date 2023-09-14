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
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Order } from './orders.entity';
import { Product } from '../../products/entities/products.entity';

@Entity({ name: 'items' })
export class Item {
  @IsEmpty()
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Identificador del registro' })
  readonly id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  // Esta es la que lleva la relacion
  @ManyToOne(() => Order, (order) => order.item)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int' })
  @ApiProperty({ description: 'Cantidad de items del product' })
  readonly quantity: number;

  @IsDate()
  @IsEmpty()
  @CreateDateColumn({
    name: 'updated_at',
    type: 'timetz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ description: 'Fecha de ultima actualizacion del registro' })
  readonly updatedAt: Date;

  @IsDate()
  @IsEmpty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timetz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ description: 'Fecha de la creacion del registro' })
  readonly createdAt: Date;
}
