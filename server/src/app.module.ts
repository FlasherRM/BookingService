import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {CommandModule} from "nestjs-command";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSeed} from "./modules/user/seeds/user.seed";
import {UserService} from "./shared/services/user/user.service";
import {SeedsModule} from "./shared/seeds.module";
import {Appointment, AppointmentsSchema} from "./appointments/appointments.schema";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
  imports: [CommandModule,
    MongooseModule.forRoot('mongodb://localhost:27017/BookingService'),
      MongooseModule.forFeature([{
        name: Appointment.name, schema: AppointmentsSchema
      }]),
    ScheduleModule.forRoot(),
  SeedsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
