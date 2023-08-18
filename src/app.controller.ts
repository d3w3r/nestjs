import { Controller, Get, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@ApiTags('general')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get a greeting' })
  @ApiInternalServerErrorResponse({ description: 'Internal server Error' })
  @Get()
  getHello(): string {
    const message = 'Hola Mundo';

    return message;
    // return this.appService.getHello();
  }
  @ApiOperation({ summary: 'Get the API value from the environment' })
  @ApiInternalServerErrorResponse({ description: 'Internal server Error' })
  @Get('apikey')
  getApiKey(): string {
    return this.appService.getApiKey();
  }
  @ApiOperation({ summary: 'Get the whole environment variables' })
  @ApiInternalServerErrorResponse({ description: 'Internal server Error' })
  @Get('envvars')
  getEnvVars() {
    return this.appService.getEnvVars();
  }
  @ApiOperation({
    summary: 'Get the list of list of tasks into jsonplaceholder api',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server Error' })
  @Get('tasks')
  getTasks(): unknown {
    return this.appService.getTasks();
  }
  @ApiOperation({ summary: 'Get a enpoint that does not matter to much' })
  @ApiInternalServerErrorResponse({ description: 'Internal server Error' })
  @Get('new')
  newPlace(): string {
    const message: string =
      'This is the new endpoint' + ' without specification of slash';

    return message;
  }
  @ApiOperation({ summary: 'Get another greeting with a confused route' })
  @ApiInternalServerErrorResponse({ description: 'Internal server Error' })
  @Get('/greating/')
  makeGreating(): string {
    const message: string =
      'Hello welcome to this api,' +
      ' this endpoint start and ends with slashes';

    return message;
  }
  @ApiOperation({ summary: 'Get nothing from the enpoint' })
  @ApiInternalServerErrorResponse({ description: 'Internal server Error' })
  @ApiNoContentResponse({ description: 'There is no content' })
  @Get('/noContent')
  @HttpCode(HttpStatus.NO_CONTENT)
  noContent() {
    // The message is ignored because the method says there is no
    // content, so that is the default behavior.
    const message = `Everything is OK but there is no content`;
    return message;
  }
  @ApiOperation({ summary: 'Get a response handled by express library' })
  @ApiInternalServerErrorResponse({ description: 'Internal server Error' })
  @Get('/expresshandled')
  handledManually(@Res() response: Response) {
    const message = 'Default message';
    // console.log(response);
    response.status(HttpStatus.OK).send(message);
    // return message;
  }
}
