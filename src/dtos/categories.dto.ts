import { Category } from './../entities/categories.entity';

export type CreateCategoryDto = Readonly<Omit<Category, 'id'>>;
export type UpdateCategoryDto = CreateCategoryDto;
export type ModifyCategoryDto = Partial<CreateCategoryDto>;
