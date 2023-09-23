import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsDate,
} from 'class-validator';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ type: String })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: string;

  @Prop({ type: Date })
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @Prop({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly userID: number;

  @Prop()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  readonly productsID: string[];

  @Prop({ type: Number })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly total: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
