import { OmitType, PartialType } from '@nestjs/mapped-types';

import { Category } from './../entities/categories.entity';

export class CreateCategoryDto extends OmitType(Category, ['id']) {}
export class UpdateCategoryDto extends CreateCategoryDto {}
export class ModifyCategoryDto extends PartialType(CreateCategoryDto) {}

// export type CreateCategoryDto = Readonly<Omit<Category, 'id'>>;
// export type UpdateCategoryDto = CreateCategoryDto;
// export type ModifyCategoryDto = Partial<CreateCategoryDto>;
