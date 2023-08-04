import { PartialType, OmitType } from '@nestjs/mapped-types';

import { Product } from './../entities/products.entity';

export class CreateProductDto extends OmitType(Product, ['id']) {}
export class UpdateProductDto extends CreateProductDto {}
export class ModifyProductDto extends PartialType(CreateProductDto) {}

// export type CreateProductDto = Omit<Product, 'id'>;
// export type ModifyProductDto = Partial<CreateProductDto>;
