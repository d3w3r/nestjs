import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { Todo } from './common/entities/todos.entity';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    OrdersModule,
    CustomersModule,
    CategoriesModule,
    BrandsModule,
    HttpModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get<Todo[]>(
          'https://jsonplaceholder.typicode.com/todos',
        );
        const tasks = await lastValueFrom(request);

        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
