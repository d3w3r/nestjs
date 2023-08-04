import {
  IsNumber,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  Length,
} from 'class-validator';

export class Product {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 250)
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}
