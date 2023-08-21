import {
  IsNumber,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  Length,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column({ type: 'int' })
  @ApiProperty()
  readonly brandID: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Column({ type: 'simple-array' })
  @ApiProperty()
  readonly categoriesID: number[];
}
