import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class User {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Length(6, 25)
  readonly password: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly customerID: number;
}
