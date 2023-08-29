import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  IsMobilePhone,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @IsString()
  @Length(2, 250)
  @IsNotEmpty()
  @Column({ type: 'varchar' })
  readonly fullname: string;

  @IsString()
  @IsMobilePhone('es-CO')
  @IsOptional()
  @Column({ type: 'varchar' })
  readonly phone?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @Column({ type: 'varchar' })
  readonly email?: string;
}
