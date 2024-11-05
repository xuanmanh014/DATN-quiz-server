import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OnlineTimeService } from './online-time.service';
import { OnlineTimeGateway } from './online-time.gateway';
import { Session, SessionSchema } from './entities/online-time.entity';
import { OnlineTimeController } from './online-time.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    ],
    controllers: [OnlineTimeController],
    providers: [OnlineTimeService, OnlineTimeGateway],
})
export class OnlineTimeModule { }
