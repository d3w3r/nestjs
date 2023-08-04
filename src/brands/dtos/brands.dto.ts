import { OmitType, PartialType } from '@nestjs/mapped-types';

import { Brand } from './../entities/brands.entity';

export class CreateBrandDto extends OmitType(Brand, ['id']) {}
export class UpdateBrandDto extends CreateBrandDto {}
export class ModifyBrandDto extends PartialType(CreateBrandDto) {}

// export type CreateBrandDto = Readonly<Omit<Brand, 'id'>>;
// export type UpdateBrandDto = CreateBrandDto;
// export type ModifyBrandDto = Partial<CreateBrandDto>;
