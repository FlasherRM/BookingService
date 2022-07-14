import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UserService } from '../../../shared/services/user/user.service';

@Injectable()
export class UserSeed {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Command({ command: 'create:user <username> <email>', describe: 'create a user'})
    async create(@Positional({
        name: 'username',
        describe: 'the username',
        type: 'string'
    })
                         username: string,
                 @Positional({
                     name: 'email',
                     describe: 'the email',
                     type: 'string'
                 })
                     email: string,) {
        const user = await this.userService.create({
            name: username,
            phone: 999999999,
            email,
            reg_token: 'SAHH1ASDS33SADSA',
            photo_avatar: "uploads/file.png",
        });
        console.log("user added: " + user);
    }
}