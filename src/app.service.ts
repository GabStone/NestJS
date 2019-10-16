import { Injectable } from '@nestjs/common';
import { AppClientService } from './app.client.service';
import { User } from './Model/User';

/**
 * User Service (Get, Create and Update)
 */

@Injectable()
export class AppService {

  constructor(private readonly appClientConnection: AppClientService) {}

  async getUser(username: any): Promise<any> {
    return this.appClientConnection.getConnection().then((connection) => {
      connection.connect();
      return connection.query('SELECT first_name, last_name, date_of_birth, sin, username FROM USERS WHERE username = $1',
        [username]);
    });
  }

  async createUser(user: User): Promise<any> {
    user.username = user.firstName.charAt(0) + user.lastName;
    return this.appClientConnection.getConnection().then((connection) => {
      connection.connect();
      return connection.query('INSERT INTO USERS(first_name, last_name, date_of_birth, sin, username) VALUES($1, $2, $3, $4, $5)',
        [user.firstName, user.lastName, user.dateOfBirth, user.sin, user.username]);
    });
  }

  async updateUserInfo(user: User): Promise<any> {
    return this.appClientConnection.getConnection().then((connection) => {
      connection.connect();
      return connection.query('UPDATE USERS SET first_name = $1, last_name = $2, date_of_birth = $3, sin = $4 WHERE username = $5',
        [user.firstName, user.lastName, user.dateOfBirth, user.sin, user.username]);
    });
  }
}
