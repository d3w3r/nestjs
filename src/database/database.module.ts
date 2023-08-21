import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';
import { ConfigType } from '@nestjs/config'

import config from './../config';

const X_API_KEY = 'Temporal123';
const X_API_KEY_PROD = 'ksdh12hhsdk2h9';

@Global()
@Module({
  providers: [
    {
      provide: 'X_API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? X_API_KEY_PROD : X_API_KEY,
    },
    {
      provide: 'PG',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { pg } = configService.database;
        const client = new Client({
          user: pg.user,
          host: pg.host,
          port: pg.port,
          database: pg.db,
          password: pg.password,
        });

        await client.connect();

        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['X_API_KEY', 'PG'],
})
export class DatabaseModule {}
