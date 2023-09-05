import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsDate,
} from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { User } from './../../users/entities/users.entity';
import { Product } from './../../products/entities/products.entity';
import { Items } from './items.entity';

@Entity()
export class Order {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @IsNotEmpty()
  @IsDate()
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  readonly date: Date;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @OneToMany(() => Items, (item) => item.order)
  item: Items[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int' })
  readonly total: number;
}
