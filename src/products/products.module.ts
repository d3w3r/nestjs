import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { BrandsModule } from './../brands/brands.module';
import { CategoriesModule } from './../categories/categories.module';

@Module({
  imports: [BrandsModule, CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
