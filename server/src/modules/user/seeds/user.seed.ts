import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UserService } from '../../../shared/services/user/user.service';

@Injectable()
export class UserSeed {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Command({ command: 'create:user', describe: 'create a user'})
    async create() {
        const user = await this.userService.create({
            name: 'Name',
            phone: 999999999,
            email: 'test@test.com',
            reg_token: 'SAHH1ASDS33SADSA',
            photo_avatar: "uploads/file.png",
        });
        console.log(user);
    }
}