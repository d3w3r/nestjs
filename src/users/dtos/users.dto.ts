import { OmitType, PartialType } from '@nestjs/mapped-types';

import { User } from '../entities/users.entity';

export class CreateUserDto extends OmitType(User, ['id']) {}
export class UpdateUserDto extends CreateUserDto {}
export class PatchUserDto extends PartialType(CreateUserDto) {}

// export type CreateUserDto = Readonly<Omit<User, 'id'>>;
// export type UpdateUserDto = CreateUserDto;
// export type PatchUserDto = Partial<CreateUserDto>;
