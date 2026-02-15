import { IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TravelStatus } from '@prisma/client';

export class CreateTravelDto {
    @ApiProperty({ example: '2024-06-01T10:00:00Z' })
    @IsDateString()
    startDate: string;

    @ApiProperty({ example: '2024-06-10T10:00:00Z' })
    @IsDateString()
    endDate: string;

    @ApiProperty({ example: 'Париж, Франція' })
    @IsString()
    destination: string;

    @ApiPropertyOptional({ example: 'Відпочинок у Парижі' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ enum: TravelStatus, example: TravelStatus.PLANNED })
    @IsOptional()
    @IsEnum(TravelStatus)
    status?: TravelStatus;
}