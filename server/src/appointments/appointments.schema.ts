import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
    @Prop({default: Date.now})
    date: Date

    @Prop()
    user: string

    @Prop()
    doctor: string

    @Prop({default: false})
    active: boolean
}

export const AppointmentsSchema = SchemaFactory.createForClass(Appointment);