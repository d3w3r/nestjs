import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { BrandsModule } from './brands/brands.module';
import { DatabaseModule } from './database/database.module';
import { environemts } from './environments';
import config from './config';

const API_KEY = 'kashdfh123fhk23jk2';

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
      isGlobal: true,
      envFilePath: environemts[process.env.NODE_ENV] || '.env',
      load: [config],
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
      provide: 'apikey',
      useValue: API_KEY,
    },
    {
      provide: 'tasks',
      useFactory: async (http: HttpService) => {
        const url = 'https://jsonplaceholder.typicode.com/todos';

        const request = http.get(url);
        const { data: tasks } = await lastValueFrom(request);

        return tasks;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
