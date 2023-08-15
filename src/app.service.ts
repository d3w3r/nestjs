import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject('apikey') private apikey: string,
    @Inject('tasks') private tasks: unknown,
    private configService: ConfigService,
    @Inject(config.KEY) private configServ: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getApiKey(): string {
    return `This is the apikey: ${this.apikey}`;
  }

  getTasks(): unknown {
    return this.tasks;
  }

  getEnvVars() {
    const xapikey = this.configService.get('X_API_KEY');
    const dbname = this.configService.get('DATABASE_NAME');
    const dbport = this.configService.get('DATABASE_PORT');

    const db = this.configServ.database;
    const key = this.configServ.xapikey;

    const responseA = `xapikey: ${xapikey}, dbname: ${dbname}, dbport: ${dbport}`;
    const responseB = `xapikey: ${key}, dbname: ${db.name}, dbport: ${db.port}`;

    return [responseA, responseB].join('\n');
  }
}
