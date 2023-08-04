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
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @IsNotEmpty()
  @Length(6, 25)
  readonly password: string;
}
