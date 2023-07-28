import {
  Controller,
  Get,
  Param,
  Put,
  Patch,
  Delete,
  Post,
  Body,
} from '@nestjs/common';

import { UsersService } from './../../services/users/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  PatchUserDto,
} from '../../dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.usersService.getOne(Number(id));
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  change(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(Number(id), payload);
  }

  @Patch(':id')
  modify(@Param('id') id: number, @Body() payload: PatchUserDto) {
    return this.usersService.modify(Number(id), payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(Number(id));
  }
}
