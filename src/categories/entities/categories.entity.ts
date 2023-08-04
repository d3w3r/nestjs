import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class Category {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  id: number;

  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  title: string;

  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  description: string;
}
