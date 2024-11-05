import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { OnlineTimeService } from './online-time.service';
import { Response, TransformInterceptor } from '../../common/interceptors/transform.interceptors';
import { Session } from './entities/online-time.entity';

@Controller('online-time')
export class OnlineTimeController {
    constructor(private readonly onlineTimeService: OnlineTimeService) { }

    @Get(':userId')
    async getTotalOnlineTime(@Param('userId') userId: string) {
        const totalOnlineTime = await this.onlineTimeService.getTotalOnlineTime(userId);
        return { userId, totalOnlineTime };
    }

    @Get()
    @UseInterceptors(TransformInterceptor)
    async getAllOnlineUser(): Promise<Response<Session[]>> {
        const sessions = await this.onlineTimeService.getAllOnlineUser();

        return {
            data: sessions,
            message: "Get all online user success!"
        };
    }
}
