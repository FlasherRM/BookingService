import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CommandModule} from "nestjs-command";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [CommandModule,
    MongooseModule.forRoot('mongodb://localhost:27017/BookingService'),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
