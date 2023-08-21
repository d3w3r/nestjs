import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 250 })
  title: string;

  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  @Column({ type: 'varchar', length: 250 })
  description: string;
}
