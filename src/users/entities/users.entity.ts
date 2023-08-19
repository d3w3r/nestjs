import {
  IsString,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsEmail,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'Unique identificator for the register' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @ApiProperty({ description: 'Passphrase that represents the user of access' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly nickname: string;

  @ApiProperty({ description: 'Password for the user' })
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

  @ApiProperty({ description: 'Identification of the customer of the user' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly customerID: number;
}
