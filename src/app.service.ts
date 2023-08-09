import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject('X_API_KEY') private apikey: string,
    @Inject('TASKS') private tasks,
    private configService: ConfigService,
  ) {}

  getHello(): string {
    return `Hello World! general api key ${this.apikey}`;
  }

  getTasks() {
    return this.tasks;
  }

  getEnvs() {
    const apikey = this.configService.get<string>('X_API_KEY');
    const database = this.configService.get<string>('DB_NAME');

    return `ApiKey=${apikey}, DabaseName=${database}`;
  }
}
