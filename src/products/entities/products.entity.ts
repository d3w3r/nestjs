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
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Brand } from 'src/brands/entities/brands.entity';

@Schema()
export class Product extends Document {
  @Prop({ isRequired: false })
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id: number;

  @Prop()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  readonly name: string;

  @Prop()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(5, 250)
  readonly description: string;

  @Prop()
  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @Prop({ type: Number, index: true }) // Indexacion simple
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @Prop({ type: Number })
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly brandID: number;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  readonly categoriesID: number[];

  @Prop(
    raw({
      title: { type: String },
      description: { type: String },
    }),
  )
  readonly category: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  readonly brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ price: 1, stock: -1 }); // Indexacion compuesta
