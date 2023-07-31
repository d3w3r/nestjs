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

export class Brand {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsAlpha()
  @Length(2, 250)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsMobilePhone('es-CO')
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 250)
  readonly address: string;
}
