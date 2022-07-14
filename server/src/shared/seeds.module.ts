import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { UserSeed } from '../modules/user/seeds/user.seed';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./services/user/user.schema";
// import { SharedModule } from './shared.module';

@Module({
    imports: [CommandModule,
        MongooseModule.forFeature([{
            name: User.name, schema: UserSchema
        }]),],
    providers: [UserSeed],
    exports: [UserSeed],
})
export class SeedsModule {}