import { WebSocketGateway, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { OnlineTimeService } from './online-time.service';

@WebSocketGateway({
    namespace: 'online-time',
    cors: {
        origin: true,
    },
})
export class OnlineTimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly onlineTimeService: OnlineTimeService) { }

    async handleConnection(client: Socket) {
        const userId = client.handshake.query.userId as string;
        if (userId) {
            await this.onlineTimeService.userConnected(userId);
        }
    }

    async handleDisconnect(client: Socket) {
        const userId = client.handshake.query.userId as string;
        if (userId) {
            await this.onlineTimeService.userDisconnected(userId);
        }
    }
}
