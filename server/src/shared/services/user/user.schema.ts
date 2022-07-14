import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop()
    reg_token: string

    @Prop()
    photo_avatar: string

    @Prop({default: "user"})
    type: string

    @Prop({default: "therapist"})
    spec: string

    @Prop({default: true})
    free: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);