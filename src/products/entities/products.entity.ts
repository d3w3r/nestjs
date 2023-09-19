import {
  IsNumber,
  IsString,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  Length,
  ArrayNotEmpty,
  IsArray,
} from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ isRequired: false })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @Prop()
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  readonly name: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  @Length(5, 250)
  readonly description: string;

  @Prop()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @Prop({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @Prop({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly brandID: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  readonly categoriesID: number[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
