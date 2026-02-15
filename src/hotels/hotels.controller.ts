import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { SearchHotelDto } from './dto/search-hotel.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Hotels')
@Controller('hotels')
export class HotelsController {
    constructor(private readonly hotelsService: HotelsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Створити новий готель' })
    create(@Body() createHotelDto: CreateHotelDto) {
        return this.hotelsService.create(createHotelDto);
    }

    @Get()
    @ApiOperation({ summary: 'Пошук готелів за місцем розташування' })
    findAll(@Query() searchDto: SearchHotelDto) {
        return this.hotelsService.findAll(searchDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Отримати готель за ID' })
    findOne(@Param('id') id: string) {
        return this.hotelsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Оновити інформацію про готель' })
    update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
        return this.hotelsService.update(id, updateHotelDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Видалити готель' })
    remove(@Param('id') id: string) {
        return this.hotelsService.remove(id);
    }
}