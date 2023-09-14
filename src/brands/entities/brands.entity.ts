import {
  IsNumber,
  IsPositive,
  IsAlpha,
  IsString,
  Length,
  IsEmpty,
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
} from 'class-validator';
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { Product } from './../../products/entities/products.entity';

@Entity({ name: 'brands' })
export class Brand {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @IsString()
  @IsAlpha()
  @Length(2, 250)
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  readonly name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  readonly email: string;

  @IsString()
  @IsMobilePhone('es-CO')
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 10 })
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 250)
  @Column({ type: 'varchar' })
  readonly address: string;

  @OneToMany(() => Product, (product) => product.brand)
  readonly product: number;

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
