import { IsNotEmpty, Length, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Please Enter First Name' })
    @IsString({ message: 'Please Enter Valid Name' })
    firstName: string;

    @IsNotEmpty({ message: 'Please Enter Last Name' })
    @IsString({ message: 'Please Enter Valid Name' })
    lastName: string;

    @IsString({ message: 'Please Enter Valid Phone number' })
    phoneNumber: string;

    @IsEmail()
    email: string;

    @Length(6, 50, {
        message: 'Password length Must be between 6 and 50 charcters',
    })
    password: string;

    roles: string[];
}
