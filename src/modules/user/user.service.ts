import { Injectable, NotFoundException } from '@nestjs/common';
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

            if (!user) throw new NotFoundException();

            return user;
        } catch (error) {
            return null;
        }
    }

    async createUser(user: CreateUserDto): Promise<User> {
        try {
            const password = await hashPassword(user.password);
            const newUser = new this.userModel({ ...user, password });
            const now = new Date();
            const eightDaysAgo = new Date(now);
            eightDaysAgo.setDate(now.getDate() - 4);

            newUser.createdAt = now;
            newUser.updatedAt = now;
            newUser.passwordUpatedAt = eightDaysAgo;

            await newUser.save();

            return newUser;
        } catch (error) {
            return null;
        }
    }

    async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
        try {
            const user = await this.userModel.findById(id);

            if (!user) throw new NotFoundException();

            const data = {
                ...userData,
                updatedAt: new Date()
            }

            const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true });

            return updatedUser;
        } catch (error) {
            return null;
        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            const user = await this.userModel.findById(id);

            if (!user) throw new NotFoundException();

            await this.userModel.findByIdAndDelete({ _id: id });

            return user;
        } catch (error) {
            return null;
        }
    }
}
