import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UploadModule } from './modules/upload/upload.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { TopicModule } from './modules/topic/topic.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { ConfigModule } from '@nestjs/config';
import { FavouriteQuizModule } from './modules/favourite-quiz/favourite-quiz.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
        }),
        MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@datn.4bo1z.mongodb.net/`),
        UserModule,
        AuthModule,
        UploadModule,
        QuizModule,
        TopicModule,
        MailerModule,
        MailerModule,
        FavouriteQuizModule
    ],
})
export class AppModule { }
