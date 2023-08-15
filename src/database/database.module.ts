import { Module, Global } from '@nestjs/common';

const REMOTE_CONNECTION = 'https://192.92.28.1/token';

@Global()
@Module({
  providers: [
    {
      provide: 'remoteconn',
      useValue: REMOTE_CONNECTION,
    },
  ],
  exports: ['remoteconn'],
})
export class DatabaseModule {}
