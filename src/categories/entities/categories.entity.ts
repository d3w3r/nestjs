import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsString,
  Length,
  IsEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';

import { Product } from './../../products/entities/products.entity';

@Entity({ name: 'categories' })
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

  @IsEmpty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timetz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly createdAt: Date;

  @IsEmpty()
  @CreateDateColumn({
    name: 'updated_at',
    type: 'timetz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  readonly updatedAt: Date;
}
