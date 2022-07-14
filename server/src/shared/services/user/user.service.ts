import { Injectable } from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }
    async create({
                     name,
                     email,
                     phone,
                    reg_token,
                    photo_avatar
                 }) {
        const newUser = new this.userModel({
            name,
            email,
            phone,
            reg_token,
            photo_avatar
        })
        await newUser.save()
    }
}
