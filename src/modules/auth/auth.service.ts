import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { JwtService } from "@nestjs/jwt";
import { User, UserDocument } from '../user/entities/user.entity';
import { validatePassword } from '../../utils/utils';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) { }

    async loginUser(loginData: LoginUserDto): Promise<string> {
        const email = loginData.email;
        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException("User does not exist!");
        }

        const valid = await validatePassword(loginData.password, user.password);
        if (valid) {
            const payload = { email, userFullName: `${user.firstName} ${user.lastName}` }
            const token = await this.jwtService.signAsync(payload);
            return token;
        }

        throw new UnauthorizedException("Email or password is invalid!");
    }
}
