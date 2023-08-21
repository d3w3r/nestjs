import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import util from 'util';

@Injectable()
export class AppService {
  constructor(
    @Inject('X_API_KEY') private apikey: string,
    @Inject('PG') private clientPg: Client,
    @Inject('TASKS') private tasks,
    private configService: ConfigService,
  ) {}

  getHello() {
    return new Promise((resolve, reject) => {
      const querystr = 'SELECT * FROM tasks';

      this.clientPg.query(querystr, (err, res) => {
        if (err) reject(err);
        else resolve(res.rows);
      });
    });
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
