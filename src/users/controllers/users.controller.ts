import {
  Controller,
  Get,
  Param,
  Put,
  Patch,
  Delete,
  Post,
  Body,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';

import { UsersService } from './../services/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  PatchUserDto,
} from './../dtos/users.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    @Inject('X_API_KEY') private apikey: string,
  ) {}

  @Get('apikey')
  getTasks() {
    return `This is apikey value: ${this.apikey}`;
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOne(id);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  change(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Patch(':id')
  modify(@Param('id', ParseIntPipe) id: number, @Body() payload: PatchUserDto) {
    return this.usersService.modify(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(Number(id));
  }
}
