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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Створити нову кімнату' })
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(createRoomDto);
    }

    @Get()
    @ApiOperation({ summary: 'Отримати всі кімнати' })
    @ApiQuery({ name: 'hotelId', required: false, type: String })
    findAll(@Query('hotelId') hotelId?: string) {
        return this.roomsService.findAll(hotelId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Отримати кімнату за ID' })
    findOne(@Param('id') id: string) {
        return this.roomsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Оновити інформацію про кімнату' })
    update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
        return this.roomsService.update(id, updateRoomDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Видалити кімнату' })
    remove(@Param('id') id: string) {
        return this.roomsService.remove(id);
    }
}