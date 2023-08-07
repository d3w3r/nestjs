import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsDate,
} from 'class-validator';

export class Order {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly userID: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  readonly productsID: number[];

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly total: number;
}
