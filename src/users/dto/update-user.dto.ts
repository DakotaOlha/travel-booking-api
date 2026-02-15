import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['email', 'password'] as const)
) { }