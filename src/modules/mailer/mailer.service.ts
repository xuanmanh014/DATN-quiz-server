import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { ForgotPasswordDto } from './dto/create-mailer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { hashPassword } from '../../utils/utils';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "darkstar2509@gmail.com",
                pass: "tqzxoqosulnbmihn",
            }
        });
    }

    async sendNewPassword(mailerData: ForgotPasswordDto) {
        try {
            const mailOptions = {
                from: 'ADMIN',
                to: mailerData.email,
                subject: 'New password',
                html: `
                    <p>Your new password: ${mailerData.password}</p>
                `
            };
            const newPass = await hashPassword(mailerData.password);

            await this.userModel.findOneAndUpdate(
                { email: mailerData.email },
                { password: newPass },
                { new: true }
            );

            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    throw new BadRequestException();
                } else {
                    console.log('Email sent:', info.response);
                }
            });

            return "Your new password was sent to your email, please help check!";
        } catch (error) {
            console.log("Error when send email!", error);
            throw new BadRequestException();
        }
    };
}
