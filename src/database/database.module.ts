import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import config from './../config';

const X_API_KEY = 'Temporal123';
const X_API_KEY_PROD = 'ksdh12hhsdk2h9';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const db = configService.database.mongo;
        const { user, password, host, port, database } = db;

        const uri = `mongodb://${host}:${port}`;

        return {
          uri,
          user,
          pass: password,
          dbName: database,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'X_API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? X_API_KEY_PROD : X_API_KEY,
    },
    {
      provide: 'DATABASE',
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const db = configService.database.mongo;
        const { user, password, host, port, database } = db;

        const uri = `mongodb://${user}:${password}@${host}:${port}`;

        const client = new MongoClient(uri);
        await client.connect();
        const databaseCon = client.db(database);

        return databaseCon;
      },
    },
  ],
  exports: ['X_API_KEY', 'DATABASE', MongooseModule],
})
export class DatabaseModule {}
