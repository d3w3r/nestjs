import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from './../products/products.module';
import { UsersModule } from './../users/users.module';
import { Order } from './entities/orders.entity';
import { Items } from './entities/items.entity';
import { ItemsService } from './services/items.service';
import { ItemsController } from './controllers/items.controller';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    TypeOrmModule.forFeature([Order, Items]),
  ],
  controllers: [OrdersController, ItemsController],
  providers: [OrdersService, ItemsService],
})
export class OrdersModule {}
