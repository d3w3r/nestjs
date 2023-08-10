import { lastValueFrom } from 'rxjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import * as Joi from 'joi';

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
import config from './config';

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
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        X_API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
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
