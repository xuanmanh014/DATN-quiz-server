import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { QuizModule } from './modules/quiz/quiz.module';

@Module({
    imports: [
        MongooseModule.forRoot(`mongodb+srv://xuanmanh014:xuanmanh014@datn.4bo1z.mongodb.net/`),
        UserModule,
        AuthModule,
        UploadModule,
        QuizModule,
    ],
})
export class AppModule { }
