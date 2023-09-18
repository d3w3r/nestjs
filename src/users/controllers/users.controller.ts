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
// import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import config from './../../config';
import { UsersService } from './../services/users.service';
import {
  CreateUserDto,
  UpdateUserDto,
  PatchUserDto,
} from './../dtos/users.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    // @Inject('X_API_KEY') private apikey: string,
    // private configService: ConfigService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @ApiOperation({ summary: 'Get the api key' })
  @Get('apikey')
  getConfigVars() {
    // return `This is apikey value: ${this.configService.get('X_API_KEY')}`;
    const apikey = this.configService.apikey;
    const dbname = this.configService.database.mongo.database;
    const dbport = this.configService.database.mongo.port;
    return `key: ${apikey}, dbname: ${dbname}, dbport: ${dbport}`;
  }

  @ApiOperation({ summary: 'Get one user by id' })
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOne(id);
  }

  @ApiOperation({ summary: 'Create one user' })
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @ApiOperation({ summary: 'Change a whole register' })
  @Put(':id')
  change(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Modify a user in the system' })
  @Patch(':id')
  modify(@Param('id', ParseIntPipe) id: number, @Body() payload: PatchUserDto) {
    return this.usersService.modify(id, payload);
  }

  @ApiOperation({ summary: 'Remove a user with id from the system' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(Number(id));
  }
}
