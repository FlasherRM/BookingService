import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
    @Prop()
    name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop()
    reg_token: string

    @Prop()
    photo_avatar: string

    @Prop({default: "doc"})
    type: string
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);