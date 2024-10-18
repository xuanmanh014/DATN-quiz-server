import {
    Controller,
    Body,
    Post,
    BadRequestException,
} from '@nestjs/common';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }

    @Post('login')
    async loginUser(
        @Body()
        loginData: LoginUserDto,
    ) {
        const token = await this.service.loginUser(loginData);

        if (!token) throw new BadRequestException();

        return token;
    }
}