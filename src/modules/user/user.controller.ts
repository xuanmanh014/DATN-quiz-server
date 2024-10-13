import {
    Controller,
    Body,
    Post,
    Put,
    Param,
    Get,
    UseInterceptors,
    Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Response, TransformInterceptor } from '../../interceptors/transform.interceptors';

@Controller("user")
export class UserController {
    constructor(private readonly service: UserService) { }

    @Get()
    @UseInterceptors(TransformInterceptor)
    async getUsers(): Promise<Response<User[]>> {
        try {
            const users = await this.service.getUsers();
            return {
                message: "Get all user success!",
                data: users,
            }
        } catch (error) {
            return {
                message: "Get all user failed!",
                data: [],
            }
        }
    }

    @Get(":id")
    async getUser(@Param("id") id: string): Promise<Response<User>> {
        try {
            const user = await this.service.getUser(id);
            return {
                message: "Get user success!",
                data: user
            }
        } catch (error) {
            return {
                message: "Get user success!",
                data: null
            }
        }
    }

    @Post()
    @UseInterceptors(TransformInterceptor)
    async createUser(
        @Body()
        user: CreateUserDto,
    ): Promise<Response<User>> {
        try {
            const newUser = await this.service.createUser(user);
            return {
                message: "Create user success!",
                data: newUser
            }
        } catch (error) {
            return {
                message: "Create user failed!",
                data: null
            }
        }
    }

    @Put(":id")
    async updateuser(
        @Param("id")
        id: string,
        @Body()
        user: UpdateUserDto,
    ): Promise<Response<UpdateUserDto>> {
        try {
            const updatedUser = await this.service.updateUser(id, user);

            return {
                message: "Update user success!",
                data: updatedUser,
            }
        } catch (error) {
            return {
                message: "Update user failed!",
                data: null,
            }
        }
    }

    @Delete(":id")
    async deleteUser(
        @Param("id")
        id: string
    ) {
        try {
            const deletedUser = await this.service.deleteUser(id);

            return {
                message: "Delete user success!",
                data: deletedUser,
            }
        } catch (error) {
            return {
                message: "Delete user failed!",
                data: null,
            }
        }
    }
}