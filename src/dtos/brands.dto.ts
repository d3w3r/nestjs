import { Brand } from './../entities/brands.entity';

export type CreateBrandDto = Readonly<Omit<Brand, 'id'>>;
export type UpdateBrandDto = CreateBrandDto;
export type ModifyBrandDto = Partial<CreateBrandDto>;
