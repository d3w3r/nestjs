import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('X_API_KEY') private apikey: string,
    @Inject('TASKS') private tasks,
    @Inject('DATABASE') private database: Db,
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

  async getTasksy() {
    const tasksColl = this.database.collection('tasks');
    const tasks = await tasksColl.find().toArray();

    return tasks;
  }
}
