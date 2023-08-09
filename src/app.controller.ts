import { Controller, Get, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }

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
    // console.log(response);
    response.status(HttpStatus.OK).send(message);
    // return message;
  }
}
