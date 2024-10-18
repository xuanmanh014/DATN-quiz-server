import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
    constructor(private readonly mailerService: MailerService) { }

    @Post('forgot-password')
    async forgotPassword(
        @Body()
        forgotPasswordDto: { email: string }
    ) {
        const success = await this.mailerService.sendNewPassword({
            email: forgotPasswordDto.email,
            password: "passwordreset123"
        });

        if (!success) throw new BadRequestException();

        return success;
    }
}
