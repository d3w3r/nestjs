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
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String })
  @ApiProperty({ description: 'Unique identificator for the register' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: string;

  @Prop({ type: String })
  @ApiProperty({ description: 'Passphrase that represents the user of access' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly nickname: string;

  @Prop({ type: String })
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

  @Prop({ type: Number })
  @ApiProperty({ description: 'Identification of the customer of the user' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly customerID: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
