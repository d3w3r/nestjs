// import { OmitType, PartialType } from '@nestjs/mapped-types';
import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';

import { Category } from './../entities/categories.entity';

export class CreateCategoryDto extends OmitType(Category, ['id']) {
  // ApiProperty({ description: "This the name of a person" })
}
export class UpdateCategoryDto extends CreateCategoryDto {}
export class ModifyCategoryDto extends PartialType(CreateCategoryDto) {}

// export type CreateCategoryDto = Readonly<Omit<Category, 'id'>>;
// export type UpdateCategoryDto = CreateCategoryDto;
// export type ModifyCategoryDto = Partial<CreateCategoryDto>;
