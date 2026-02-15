import { IsString, IsNumber, IsBoolean, IsOptional, IsEnum, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';

export class CreateRoomDto {
    @ApiProperty({ enum: RoomType, example: RoomType.DOUBLE })
    @IsEnum(RoomType)
    roomType: RoomType;

    @ApiProperty({ example: 1500, minimum: 0 })
    @IsNumber()
    @Min(0)
    pricePerNight: number;

    @ApiProperty({ example: 2, minimum: 1 })
    @IsNumber()
    @Min(1)
    capacity: number;

    @ApiPropertyOptional({ example: true })
    @IsOptional()
    @IsBoolean()
    available?: boolean;

    @ApiPropertyOptional({ example: 'Просторий номер з видом на місто' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 'hotel-uuid-here' })
    @IsString()
    hotelId: string;
}