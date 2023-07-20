import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get(':id')
  getOne(@Param('id') id: number) {
    const message: string = `User ${id}`;

    return { message };
  }
}
