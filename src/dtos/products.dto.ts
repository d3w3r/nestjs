import { Product } from './../entities/products.entity';

export type CreateProductDto = Omit<Product, 'id'>;
export type UpdateProductDto = CreateProductDto;
export type ModifyProductDto = Partial<CreateProductDto>;
