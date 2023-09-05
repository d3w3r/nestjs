import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from './../config';

const X_API_KEY = 'Temporal123';
const X_API_KEY_PROD = 'ksdh12hhsdk2h9';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { host, port, user, password, db } = configService.database.pg;

        return {
          type: 'postgres',
          host: host,
          port: port,
          username: user,
          password: password,
          database: db,
          synchronize: true,
          autoLoadEntities: true,
          logging: true,
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'X_API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? X_API_KEY_PROD : X_API_KEY,
    },
    {
      provide: 'PG',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { mysql } = configService.database;
        // const client = new Client({
        //   user: mysql.user,
        //   host: mysql.host,
        //   port: mysql.port,
        //   database: mysql.db,
        //   password: mysql.password,
        // });

        // await client.connect();

        // return client;
        return {};
      },
      inject: [config.KEY],
    },
  ],
  exports: ['X_API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
