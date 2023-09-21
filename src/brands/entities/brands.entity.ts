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
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Brand extends Document {
  @Prop({ type: Number })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly id: string;

  @Prop({ type: String })
  @IsString()
  @IsAlpha()
  @Length(2, 250)
  @IsNotEmpty()
  readonly name: string;

  @Prop({ type: String })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Prop({ type: String })
  @IsString()
  @IsMobilePhone('es-CO')
  @IsNotEmpty()
  readonly phone: string;

  @Prop({ type: String })
  @IsString()
  @IsNotEmpty()
  @Length(5, 250)
  readonly address: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
