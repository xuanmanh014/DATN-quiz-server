import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { JwtService } from "@nestjs/jwt";
import { User, UserDocument } from '../user/entities/user.entity';
import { hashPassword, validatePassword } from '../../utils/utils';
import { EditPasswordDto } from './dto/edit-pass.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async loginUser(loginData: LoginUserDto): Promise<string> {
        const email = loginData.email;
        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException("User does not exist!");
        }

        const valid = await validatePassword(loginData.password, user.password);

        if (valid) {
            const payload = {
                _id: user._id,
                email,
                userFullName: `${user.firstName} ${user.lastName}`,
                phoneNumber: user.phoneNumber
            }
            const token = await this.jwtService.signAsync(payload);
            return token;
        }

        throw new UnauthorizedException("Email or password is invalid!");
    }

    async changePassword(id: string, values: EditPasswordDto): Promise<string> {
        const user = await this.userModel.findById(id);
        const now = new Date();
        const passwordUpatedAt = new Date(user.passwordUpatedAt);
        const diff = (now.getTime() - passwordUpatedAt.getTime()) / (1000 * 60 * 60 * 24);

        if (diff < 3) throw new BadRequestException("Only can update your password after 3 days", {
            cause: new Error(),
            description: 'Some error description',
        });

        if (!user) {
            throw new UnauthorizedException("User does not exist!");
        }

        const isRepeat = await validatePassword(values.currentPass, values.newPass);

        if (isRepeat) throw new BadRequestException("New password should not be the same with current password!");

        const valid = await validatePassword(values.currentPass, user.password);

        if (valid) {
            const newPass = await hashPassword(values.newPass);

            await this.userModel.findByIdAndUpdate(id, { password: newPass, passwordUpatedAt: new Date() }, { new: true });

            return "Change password success!";
        }

        throw new UnauthorizedException("Current password is invalid!");
    }
}
