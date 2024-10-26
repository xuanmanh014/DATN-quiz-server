import {
    Controller,
    Body,
    Post,
    BadRequestException,
    Patch,
    Param,
} from '@nestjs/common';
import { LoginUserDto } from '../auth/dto/login-user.dto';
import { AuthService } from './auth.service';
import { EditPasswordDto } from './dto/edit-pass.dto';

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

    @Patch(":id/edit-password")
    async changePassword(
        @Param("id")
        id: string,
        @Body()
        editPass: EditPasswordDto,
    ) {
        const message = await this.service.changePassword(id, editPass);

        if (!message) throw new BadRequestException();

        return message;
    }
}