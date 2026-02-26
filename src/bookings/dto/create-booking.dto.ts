import { IsString, IsDateString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
    @ApiProperty({ example: '2024-06-01T14:00:00Z' })
    @IsDateString()
    checkInDate: string;

    @ApiProperty({ example: '2024-06-05T12:00:00Z' })
    @IsDateString()
    checkOutDate: string;

    @ApiProperty({ example: 2, minimum: 1 })
    @IsNumber()
    @Min(1)
    guestsCount: number;

    @ApiPropertyOptional({ example: 'Need a high floor' })
    @IsOptional()
    @IsString()
    specialRequests?: string;

    @ApiProperty({ example: 'hotel-uuid-here' })
    @IsString()
    hotelId: string;

    @ApiProperty({ example: 'room-uuid-here' })
    @IsString()
    roomId: string;

    @ApiPropertyOptional({ example: 'travel-uuid-here' })
    @IsOptional()
    @IsString()
    travelId?: string;
}