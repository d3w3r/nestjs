import { User } from '../entities/users.entity';

export type CreateUserDto = Readonly<Omit<User, 'id'>>;
export type UpdateUserDto = CreateUserDto;
export type PatchUserDto = Partial<CreateUserDto>;
