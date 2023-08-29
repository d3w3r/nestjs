import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { ProductsModule } from './../products/products.module';
import { UsersModule } from './../users/users.module';
import { Order } from './entities/orders.entity';

@Module({
  imports: [ProductsModule, UsersModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
