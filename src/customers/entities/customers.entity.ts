import { User } from './../../users/entities/users.entity';

import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  IsMobilePhone,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class Customer {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @Length(2, 250)
  @IsNotEmpty()
  readonly fullname: string;

  @IsString()
  @IsMobilePhone('es-CO')
  @IsOptional()
  readonly phone?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  // @IsNotEmpty()
  // readonly user: User;
}
