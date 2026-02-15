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
import { TravelsService } from './travels.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Travels')
@Controller('travels')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TravelsController {
    constructor(private readonly travelsService: TravelsService) { }

    @Post()
    @ApiOperation({ summary: 'Створити нову подорож' })
    create(@Request() req, @Body() createTravelDto: CreateTravelDto) {
        return this.travelsService.create(req.user.id, createTravelDto);
    }

    @Get()
    @ApiOperation({ summary: 'Отримати всі подорожі користувача' })
    findAll(@Request() req) {
        return this.travelsService.findAll(req.user.id);
    }

    @Get('history')
    @ApiOperation({ summary: 'Отримати історію подорожей користувача' })
    getUserHistory(@Request() req) {
        return this.travelsService.getUserTravelHistory(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Отримати подорож за ID' })
    findOne(@Param('id') id: string, @Request() req) {
        return this.travelsService.findOne(id, req.user.id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Оновити інформацію про подорож' })
    update(
        @Param('id') id: string,
        @Request() req,
        @Body() updateTravelDto: UpdateTravelDto,
    ) {
        return this.travelsService.update(id, req.user.id, updateTravelDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Видалити подорож' })
    remove(@Param('id') id: string, @Request() req) {
        return this.travelsService.remove(id, req.user.id);
    }
}