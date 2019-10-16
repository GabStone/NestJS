import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';

/**
 * User Controller
 */

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/createUser')
  async createUser(@Req() req: FastifyRequest, @Res() res: FastifyReply<any>): Promise<any> {
    this.appService.createUser(req.body).then((result) => {
      if (result.rowCount === 0) {
        res.send({status: -1, message: 'Failure. User Not Created'});
      }
      res.send({status: 0, message: 'User Created'});
    });

  }

  @Post('/updateUser')
  async updateUser(@Req() req: FastifyRequest, @Res() res: FastifyReply<any>): Promise<any> {
    this.appService.updateUserInfo(req.body).then((result) => {
      if (result.rowCount === 0) {
        res.send({status: -1, message: 'User Not Found'});
      }
      res.send({status: 0, message: 'User Updated'});
    });
  }

  @Get('getUserInfo/:username')
  async getUserInfo(@Param() params): Promise<any> {
    let result = null;
    return this.appService.getUser(params.username).then((user) => {
      if (user.rowCount === 0) {
        // Not Found
        return {status: -1, message: 'User Not Found'};
      }
      result = user.rows[0];
      return result;
    });
  }
}
