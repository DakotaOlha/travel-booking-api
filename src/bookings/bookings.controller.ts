import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Bookings')
@Controller('bookings')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    @Post()
    @ApiOperation({ summary: 'Створити нове бронювання' })
    create(@Request() req, @Body() createBookingDto: CreateBookingDto) {
        return this.bookingsService.create(req.user.id, createBookingDto);
    }

    @Get()
    @ApiOperation({ summary: 'Отримати всі бронювання користувача' })
    findAll(@Request() req) {
        return this.bookingsService.findAll(req.user.id);
    }

    @Get('report')
    @ApiOperation({ summary: 'Генерація звітів по запитах на бронювання' })
    generateReport(@Request() req) {
        return this.bookingsService.generateBookingReport(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Отримати бронювання за ID' })
    findOne(@Param('id') id: string, @Request() req) {
        return this.bookingsService.findOne(id, req.user.id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Оновити інформацію про бронювання' })
    update(
        @Param('id') id: string,
        @Request() req,
        @Body() updateBookingDto: UpdateBookingDto,
    ) {
        return this.bookingsService.update(id, req.user.id, updateBookingDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Видалити бронювання' })
    remove(@Param('id') id: string, @Request() req) {
        return this.bookingsService.remove(id, req.user.id);
    }
}