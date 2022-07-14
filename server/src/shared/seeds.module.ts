import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { UserSeed } from '../modules/user/seeds/user.seed';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./services/user/user.schema";
import {UserService} from "./services/user/user.service";
import {DoctorSeed} from "../modules/user/seeds/doctor.seed";
import { DoctorService } from './services/doctor/doctor.service';
import {Doctor, DoctorSchema} from "./services/doctor/doctor.schema";
// import { SharedModule } from './shared.module';

@Module({
    imports: [
        CommandModule,
        MongooseModule.forFeature([{
            name: User.name, schema: UserSchema
        }]),
        MongooseModule.forFeature([{
            name: Doctor.name, schema: DoctorSchema
        }])
    ],
    providers: [UserSeed, UserService, DoctorSeed, DoctorService],
    exports: [UserSeed, UserService, DoctorSeed, DoctorService],
})
export class SeedsModule {}