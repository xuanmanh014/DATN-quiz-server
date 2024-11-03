import {
    Controller,
    Body,
    Post,
    Put,
    Param,
    Get,
    UseInterceptors,
    Delete,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Response, TransformInterceptor } from '../../common/interceptors/transform.interceptors';

@Controller("user")
export class UserController {
    constructor(private readonly service: UserService) { }

    @Get()
    @UseInterceptors(TransformInterceptor)
    async getUsers(): Promise<Response<User[]>> {
        const users = await this.service.getUsers();

        if (!users) throw new BadRequestException();

        return {
            message: "Get all user success!",
            data: users,
        }
    }

    @Get(":id")
    async getUser(@Param("id") id: string): Promise<Response<User>> {
        const user = await this.service.getUser(id);

        if (!user) throw new NotFoundException();

        return {
            message: "Get user success!",
            data: user
        }
    }

    @Post()
    @UseInterceptors(TransformInterceptor)
    async createUser(
        @Body()
        user: CreateUserDto,
    ): Promise<Response<User>> {
        const newUser = await this.service.createUser(user);

        if (!newUser) throw new BadRequestException();

        return {
            message: "Create user success!",
            data: newUser
        }
    }

    @Put(":id")
    async updateuser(
        @Param("id")
        id: string,
        @Body()
        user: UpdateUserDto,
    ): Promise<Response<UpdateUserDto>> {
        const updatedUser = await this.service.updateUser(id, user);

        if (!updatedUser) throw new BadRequestException();

        return {
            message: "Update user success!",
            data: updatedUser,
        }
    }

    @Delete(":id")
    async deleteUser(
        @Param("id")
        id: string
    ) {
        const deletedUser = await this.service.deleteUser(id);

        if (!deletedUser) throw new BadRequestException();

        return {
            message: "Delete user success!",
            data: null,
        }
    }
}