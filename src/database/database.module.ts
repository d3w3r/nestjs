import { Module, Global } from '@nestjs/common';

const X_API_KEY = 'Temporal123';
const X_API_KEY_PROD = 'ksdh12hhsdk2h9';

@Global()
@Module({
  providers: [
    {
      provide: 'X_API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? X_API_KEY_PROD : X_API_KEY,
    },
  ],
  exports: ['X_API_KEY'],
})
export class DatabaseModule {}
