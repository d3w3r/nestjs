import {
  IsNumber,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  Length,
  ArrayNotEmpty,
  IsArray,
  IsEmpty,
  IsDate,
} from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Brand } from './../../brands/entities/brands.entity';
import { Order } from './../../orders/entities/orders.entity';
import { Category } from './../../categories/entities/categories.entity';

@Entity()
export class Product {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @PrimaryGeneratedColumn()
  @ApiProperty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 250)
  @Column({ type: 'text' })
  @ApiProperty()
  readonly description: string;

  @IsNotEmpty()
  @IsUrl()
  @Column({ type: 'varchar' })
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int' })
  @ApiProperty()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Column({ type: 'int' })
  @ApiProperty()
  readonly stock: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  @ManyToOne(() => Brand, (brand) => brand.product)
  brand: Brand;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty()
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @IsEmpty()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly createdAt: Date;

  @IsEmpty()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  readonly updatedAt: Date;
}
