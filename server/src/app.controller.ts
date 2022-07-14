import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("createappointment")
  async createAppointment(@Body('user') user: number, @Body('doctor') doctor: number) {
    // var date = Date.now()
    var date = new Date(); // Now
    date.setDate(date.getDate());
    console.log("successfully found users with id: " + user + " and " + doctor + ".Time right now is " + date)
    const result = await this.appService.validate(user, doctor);
    const timeresult = await this.appService.checkComfortTime(date);
    if(timeresult == false ) {
      return "Забагато прийомів в доктора"
    }
    const server = await this.appService.addAppointment(user, doctor, timeresult)
  }
  @Post("accept")
  async accept(@Body('doctor_id') doctor_id: number, @Body('appointment_id') appointment_id: number, @Body('accept') accept: boolean) {
    const validation = await this.appService.validateWhileAccept(appointment_id, doctor_id);
    if(validation == {
      "message": "failure"
    }) {
      return "OOpss, something went wrong :("
    }
    return await this.appService.accept(doctor_id, appointment_id, accept)
  }
}
