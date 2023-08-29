import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsDate,
} from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @IsNotEmpty()
  @IsDate()
  @Column({ type: 'date' })
  readonly date: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int' })
  readonly userID: number;

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
