import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class SearchHotelDto extends PaginationDto {
    @ApiPropertyOptional({ example: 'Київ' })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiPropertyOptional({ example: 'Grand' })
    @IsOptional()
    @IsString()
    name?: string;
}