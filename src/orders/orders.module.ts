import { Module } from '@nestjs/common';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from './../products/products.module';
import { UsersModule } from './../users/users.module';

@Module({
  imports: [ProductsModule, UsersModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
