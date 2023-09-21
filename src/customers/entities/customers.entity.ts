import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
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

@Schema()
export class Customer extends Document {
  @Prop({ type: String })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: string;

  @Prop({ type: String })
  @IsString()
  @Length(2, 250)
  @IsNotEmpty()
  readonly fullname: string;

  @Prop({ type: String })
  @IsString()
  @IsMobilePhone('es-CO')
  @IsOptional()
  readonly phone?: string;

  @Prop({ type: String })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
