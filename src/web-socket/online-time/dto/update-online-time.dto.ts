import { PartialType } from '@nestjs/mapped-types';
import { CreateOnlineTimeDto } from './create-online-time.dto';
import { User } from '../../../modules/user/entities/user.entity';

export class UpdateOnlineTimeDto extends PartialType(CreateOnlineTimeDto) {
    userId: User;
    connectedAt: Date;
    disconnectedAt?: Date;
    duration?: number;
}
