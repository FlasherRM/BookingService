import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./shared/services/user/user.schema";
import {Model} from "mongoose";
import {Appointment, AppointmentDocument} from "./appointments/appointments.schema";
import {UserService} from "./shared/services/user/user.service";
import {DoctorService} from "./shared/services/doctor/doctor.service";
import {Cron} from "@nestjs/schedule";

@Injectable()
export class AppService {
    constructor(@InjectModel(Appointment.name) private appointModel: Model<AppointmentDocument>,
                private readonly userService: UserService,
                private readonly doctorService: DoctorService) {
    }
    private readonly logger = new Logger(AppService.name);

    @Cron('* * * * * *')
    async handleCron() {
        const data = await this.appointModel.find();

        var date = new Date(); // Now
        date.setDate(date.getTime());

        data.map(async (appoint) => {
            if(appoint.date.getTime() < date.getTime()) {
                appoint.active == false;
                await appoint.save();
            }
        })
    }

    @Cron('* * * * * *')
    async handleMessage() {
        const data = await this.appointModel.find();

        var dateTime = new Date(); // Now
        dateTime.setDate(dateTime.getDate());

        data.map(async (appoint) => {
            // @ts-ignore
            const doctor = await this.doctorService.findOne(appoint.doctor)
            if(appoint.date.getDate() == dateTime.getTime() - 1 && dateTime.getHours() == appoint.date.getHours() && dateTime.getMinutes() == appoint.date.getMinutes() && dateTime.getSeconds() == appoint.date.getSeconds()) {
                await console.log(`${{ dateTime }} | Привет! Напоминаем что вы записаны к ${{ doctor }} завтра в ${{ dateTime }}!`)
            }
            if(appoint.date.getDate() == dateTime.getDate() && appoint.date.getHours() == dateTime.getHours() - 2 && dateTime.getMinutes() == appoint.date.getMinutes() && dateTime.getSeconds() == appoint.date.getSeconds()) {
                console.log(`${{ dateTime }} | Привет! Вам через 2 часа к ${{ doctor }} в ${{ dateTime }}!`)
            }
        })
    }



    async createAppointment(user: string, doctor: string) {

    }
    async validate(user_id: number, doctor_id: number) {
        const user = await this.userService.findOne(user_id);
        const doctor = await this.doctorService.findOne(doctor_id);

        if(!user || !doctor) {
            return {
                "message": "failure"
            }
        }
        return {
            user: user,
            doctor
        }
    }
    async validateWhileAccept(appointment_id: number, doctor_id: number) {
        const appointment = await this.appointModel.findById(appointment_id)
        const doctor = await this.doctorService.findOne(doctor_id);

        if(!appointment || !doctor) {
            return {
                "message": "failure"
            }
        }
        return {
            "message": "success"
        }
    }
    async checkComfortTime(date) {
        if(date.getHours() > 16) { // тут проверяю больше ли за 13:00
            date.setDate(date.getDate() + 1); // ставлю на день больше
            date.setHours(16); // ставлю 13:00
            date.setMinutes(0);
            date.setSeconds(0);
            const apps = await this.appointModel.find({time: date}) // провераю есть ли такая запись
            console.log(apps)
            if(apps.length == 1) {
                date.setHours(18); // ставлю 15:00
                date.setMinutes(0);
                date.setSeconds(0);
                return date;
            } else if(apps.length == 2){
                date.setHours(20); // ставлю 17:00
                date.setMinutes(0);
                date.setSeconds(0);
                return date;
            } else if(apps.length > 2) {
                return false;
            }
            return date;
        }
    }
    async addAppointment(user, doctor, time) {
        const newApp = new this.appointModel({
            date: time,
            user,
            doctor
        })
        await newApp.save()
        await this.userService.addAppointment(user, newApp._id);
    }
    async accept(doctor_id, app_id, accept) {
        if(accept == true) {
            const appointment = await this.appointModel.findById(app_id);
            if(appointment.doctor != doctor_id) {
                return "WTF, ТАКОГО БУТИ НЕ МОЖЕ)"
            }
            appointment.active = true;
            await appointment.save();

            await this.doctorService.addAppointment(doctor_id, app_id)
            return {
                "message": "success"
            }
        } else{
            await this.appointModel.findByIdAndDelete(app_id)
            return {
                "message": "success"
            }
        }
    }
}
