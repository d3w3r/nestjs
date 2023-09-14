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
  JoinColumn,
} from 'typeorm';

import { User } from './../../users/entities/users.entity';
import { Product } from './../../products/entities/products.entity';
import { Item } from './items.entity';

@Entity({ name: 'orders' })
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
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Item, (item) => item.order)
  item: Item[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int' })
  readonly total: number;
}
