import { Injectable } from '@nestjs/common';
import { Client } from 'pg';

/**
 * PostgreSQL Connection Service
 */

@Injectable()
export class AppClientService {

  async getConnection(): Promise<Client> {
    return new Client({
      user: 'postgres',
      host: '127.0.0.1',
      database: 'NestJS',
      password: 'postgres',
      port: 5432,
    });
  }
}
