import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Doctor, DoctorDocument,} from "./doctor.schema";

@Injectable()
export class DoctorService {
    constructor(@InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>) {
    }
    async create({
                     name,
                     email,
                     phone,
                    reg_token,
                    photo_avatar
                 }) {
        const newUser = new this.doctorModel({
            name,
            email,
            phone,
            reg_token,
            photo_avatar
        })
        return newUser.save()
    }
    async findOne(doctor: number) {
        return await this.doctorModel.findById(doctor)
    }
    async addAppointment(doctor_id, app_id) {
        const doctor = await this.doctorModel.findById(doctor_id);
        doctor.appointments_accepted.push(app_id);

        await doctor.save();
    }
}
