import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BookingStatus } from '@prisma/client';

export class UpdateBookingDto extends PartialType(
    OmitType(CreateBookingDto, ['hotelId', 'roomId'] as const)
) {
    @ApiPropertyOptional({ enum: BookingStatus })
    @IsOptional()
    @IsEnum(BookingStatus)
    status?: BookingStatus;
}