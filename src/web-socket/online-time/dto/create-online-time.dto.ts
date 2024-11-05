import { User } from "../../../modules/user/entities/user.entity";

export class CreateOnlineTimeDto {
    userId: User;
    connectedAt: Date;
    disconnectedAt?: Date;
    duration?: number;
}
