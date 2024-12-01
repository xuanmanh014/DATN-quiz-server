import { Module } from '@nestjs/common';
import { LearnVideoService } from './learn-video.service';
import { LearnVideoController } from './learn-video.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LearnVideo, LearnVideoSchema } from './entities/learn-video.entity';

@Module({
    imports: [MongooseModule.forFeature([{ schema: LearnVideoSchema, name: LearnVideo.name }])],
    controllers: [LearnVideoController],
    providers: [LearnVideoService],
})
export class LearnVideoModule { }
