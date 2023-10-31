import { Response, Request } from 'express';
import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Res,
  UseGuards,
  // SetMetadata,
} from '@nestjs/common';

import { AppService } from './app.service';
import { ApikeyGuard } from './auth/guards/apikey.guard';
import { Public } from './auth/decorators/public.decorator';

@UseGuards(ApikeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }

  // @SetMetadata('isPublic', true)
  @Public()
  @Get('envs')
  getEnvironments() {
    return this.appService.getEnvs();
  }

  // @UseGuards(ApikeyGuard)
  // @SetMetadata('isPublic', true)
  @Public()
  @Get('new')
  newPlace(): string {
    const message: string =
      'This is the new endpoint' + ' without specification of slash';

    return message;
  }

  @Get('/greating/')
  makeGreating(): string {
    const message: string =
      'Hello welcome to this api,' +
      ' this endpoint start and ends with slashes';

    return message;
  }

  @Get('/noContent')
  @HttpCode(HttpStatus.NO_CONTENT)
  noContent() {
    // The message is ignored because the method says there is no
    // content, so that is the default behavior.
    const message = `Everything is OK but there is no content`;
    return message;
  }

  @Get('/expresshandled')
  handledManually(@Res() response: Response) {
    const message = 'Default message';
    response.status(HttpStatus.OK).send(message);
  }
}
