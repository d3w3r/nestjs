import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

@Schema()
export class Category extends Document {
  @Prop({ type: String })
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  id: string;

  @Prop({ type: String })
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  title: string;

  @Prop({ type: String })
  @IsString()
  @Length(1, 250)
  @IsNotEmpty()
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
