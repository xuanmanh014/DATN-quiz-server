import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from '../../utils/utils';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
    ) { }

    async getUsers(): Promise<User[]> {
        try {
            const users = await this.userModel.find();
            return users;
        } catch (error) {
            return null;
        }
    }

    async getUser(userId: string): Promise<User> {
        try {
            const user = await this.userModel.findById(userId);
            return user;
        } catch (error) {
            return null;
        }
    }

    async createUser(user: CreateUserDto): Promise<User> {
        try {
            const password = await hashPassword(user.password);
            return await new this.userModel({ ...user, password }).save();
        } catch (error) {
            return null;
        }
    }

    async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
        try {
            return await this.userModel.findByIdAndUpdate(id, userData, { new: true });
        } catch (error) {
            return null;
        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            await this.userModel.findByIdAndDelete({ _id: id });

            return null;
        } catch (error) {
            return null;
        }
    }
}
