import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

import { Product } from './../../products/entities/products.entity';

@Entity()
export class Category {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 250 })
  @ApiProperty()
  title: string;

  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 250 })
  @ApiProperty()
  description: string;

  @ManyToMany(() => Product, (product) => product.categories)
  readonly products: Product[];
}
