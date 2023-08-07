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

export class Product {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 250)
  readonly description: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly brandID: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  readonly categoriesID: number[];
}
