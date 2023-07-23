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

@Controller('users')
export class UsersController {
  @Get(':id')
  getOne(@Param('id') id: number) {
    const message = `User ${id}`;

    return { message };
  }

  @Post()
  create(@Body() payload: unknown) {
    const message = 'Method for create a user';
    return { message, payload };
  }

  @Put(':id')
  change(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Method for change the user ${id}.`;
    return { message, payload };
  }

  @Patch(':id')
  modify(@Param('id') id: number, @Body() payload: unknown) {
    const message = `Method for modify the user ${id}.`;
    return { message, payload };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    const message = `Method for remove the user ${id}`;
    return { message };
  }
}
