import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { BrandsModule } from './../brands/brands.module';
import { CategoriesModule } from './../categories/categories.module';
import { Product, ProductSchema } from './entities/products.entity';

@Module({
  imports: [
    BrandsModule,
    CategoriesModule,
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
