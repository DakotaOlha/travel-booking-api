import { IsString, IsOptional, IsNumber, Min, Max, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHotelDto {
    @ApiProperty({ example: 'Grand Hotel Kyiv' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Київ, Україна' })
    @IsString()
    location: string;

    @ApiPropertyOptional({ example: 'Розкішний готель у центрі міста' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 'вул. Хрещатик, 1' })
    @IsString()
    address: string;

    @ApiPropertyOptional({ example: 4.5, minimum: 0, maximum: 5 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;

    @ApiPropertyOptional({ example: ['WiFi', 'Басейн', 'Спортзал', 'Ресторан'] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    amenities?: string[];
}