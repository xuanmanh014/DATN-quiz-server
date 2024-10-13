import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot(`mongosh "mongodb+srv://datn.4bo1z.mongodb.net/" --apiVersion 1 --username xuanmanh014`),
        UserModule
    ],
})
export class AppModule { }
