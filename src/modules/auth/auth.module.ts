import { MongooseModule } from "@nestjs/mongoose";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { User, UserSchema } from "../user/entities/user.entity";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3d' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        {
            provide: AuthService,
            useClass: AuthService,
        },
    ],
})
export class AuthModule { }
