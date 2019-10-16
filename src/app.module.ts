import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppClientService } from './app.client.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppClientService],
})

export class AppModule {}
