import {
  IsNumber,
  IsPositive,
  IsAlpha,
  IsString,
  Length,
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
} from 'class-validator';
import { PrimaryGeneratedColumn, Entity, Column, OneToMany } from 'typeorm';

import { Product } from './../../products/entities/products.entity';

@Entity()
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

  @OneToMany(() => Product, (product) => product.brandId)
  readonly productId: number;
}
