import {
    Controller,
    Body,
    Post,
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
        return await this.service.loginUser(loginData);
    }
}