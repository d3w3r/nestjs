import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { BrandsModule } from './../brands/brands.module';
import { CategoriesModule } from './../categories/categories.module';
import { Product } from './entities/products.entity';

@Module({
  imports: [
    BrandsModule,
    CategoriesModule,
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
