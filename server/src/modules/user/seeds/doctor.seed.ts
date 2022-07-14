import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UserService } from '../../../shared/services/user/user.service';
import {DoctorService} from "../../../shared/services/doctor/doctor.service";

@Injectable()
export class DoctorSeed {
    constructor(
        private readonly doctorService: DoctorService,
    ) { }

    @Command({ command: 'create:doctor <username> <email>', describe: 'create a doctor'})
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
        const doctor = await this.doctorService.create({
            name: username,
            phone: 999999999,
            email,
            reg_token: 'SAHH1ASDS33SADSA',
            photo_avatar: "uploads/file.png"
        });
        console.log(doctor);
    }
}