import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.schemas';
import { Model } from 'mongoose';
import { iUser } from './users.dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User.name) public userModel: Model<UserDocument>
    ) { }

    findOne(email: string, password: string): Promise<User> {
        return this.userModel.findOne({ email: email, password: password }).exec();
    }

    findOneById(id: string): Promise<User> {
        return this.userModel.findOne({ _id: id }).exec();
    }

    getAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async delete(id: string) {
        return await this.userModel.findByIdAndRemove({ _id: id }).exec()
    }

    async update(id: string, user: iUser): Promise<User> {
        return await this.userModel.findOneAndUpdate({ _id: id }, user);
    }

    async create(user: iUser): Promise<User> {
        return await this.userModel.create(user);
    }
}