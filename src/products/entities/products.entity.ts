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
import { Exclude, Expose } from 'class-transformer';
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
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Brand } from './../../brands/entities/brands.entity';
import { Order } from './../../orders/entities/orders.entity';
import { Category } from './../../categories/entities/categories.entity';

@Entity({ name: 'products' })
@Index(['price', 'stock'])
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
  @Index()
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
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty()
  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id',
    },
    inverseJoinColumn: {
      name: 'category_id',
    },
  })
  categories: Category[];

  @IsEmpty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  readonly createdAt: Date;

  @IsEmpty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  readonly updatedAt: Date;

  @Expose()
  get nuevo() {
    return 'This is a new stuff';
  }
}
