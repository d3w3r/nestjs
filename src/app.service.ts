import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('X_API_KEY') private apikey: string,
    @Inject('TASKS') private tasks,
  ) {}

  getHello(): string {
    return `Hello World! general api key ${this.apikey}`;
  }

  getTasks() {
    return this.tasks;
  }
}
