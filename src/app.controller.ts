import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const message: string = 'Hola Mundo';

    return message;
    // return this.appService.getHello();
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

  @Get('products')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    // getProducts(@Query() params: any) {
    //   const { limit, offset } = params;
    const message: string = `products | limit = ${limit} offset = ${offset} brand = ${brand}`;

    return message;
  }

  @Get('products/filter')
  getProductFilter() {
    const message: string = `This is a filter!`;

    return message;
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string) {
    const message: string = `product ${id}`;

    return message;
  }

  @Get('categories/:cid/products/:pid')
  getCategoriesAndProduct(
    @Param('cid') cid: string,
    @Param('pid') pid: string,
  ) {
    const message: string = `category ${cid} and product ${pid}`;

    return message;
  }
}
