import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
    passwordUpatedAt: Date;
}
