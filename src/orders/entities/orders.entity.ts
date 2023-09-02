import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsDate,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User } from './../../users/entities/users.entity';

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

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int', nullable: true })
  @ManyToOne(() => User, (user) => user.order)
  readonly userId: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Column({ type: 'simple-array' })
  readonly productsID: number[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int' })
  readonly total: number;
}
