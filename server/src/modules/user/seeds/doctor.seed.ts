import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UserService } from '../../../shared/services/user/user.service';
import {DoctorService} from "../../../shared/services/doctor/doctor.service";

@Injectable()
export class DoctorSeed {
    constructor(
        private readonly doctorService: DoctorService,
    ) { }

    @Command({ command: 'create:doctor', describe: 'create a doctor'})
    async create() {
        const doctor = await this.doctorService.create({
            name: 'Name',
            phone: 999999999,
            email: 'test@test.com',
            reg_token: 'SAHH1ASDS33SADSA',
            photo_avatar: "uploads/file.png"
        });
        console.log(doctor);
    }
}