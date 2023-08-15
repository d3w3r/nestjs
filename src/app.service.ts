import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('apikey') private apikey: string,
    @Inject('tasks') private tasks: unknown,
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
}
