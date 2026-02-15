import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { SearchHotelDto } from './dto/search-hotel.dto';

@Injectable()
export class HotelsService {
    constructor(private prisma: PrismaService) { }

    async create(createHotelDto: CreateHotelDto) {
        return this.prisma.hotel.create({
            data: createHotelDto,
            include: {
                rooms: true,
            },
        });
    }

    async findAll(searchDto: SearchHotelDto) {
        const { page = 1, limit = 10, location, name } = searchDto;
        const skip = (page - 1) * limit;

        const where: any = {};

        if (location) {
            where.location = {
                contains: location,
                mode: 'insensitive',
            };
        }

        if (name) {
            where.name = {
                contains: name,
                mode: 'insensitive',
            };
        }

        const [hotels, total] = await Promise.all([
            this.prisma.hotel.findMany({
                where,
                skip,
                take: limit,
                include: {
                    rooms: {
                        select: {
                            id: true,
                            roomType: true,
                            pricePerNight: true,
                            available: true,
                        },
                    },
                },
            }),
            this.prisma.hotel.count({ where }),
        ]);

        return {
            data: hotels,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string) {
        const hotel = await this.prisma.hotel.findUnique({
            where: { id },
            include: {
                rooms: true,
            },
        });

        if (!hotel) {
            throw new NotFoundException('Готель не знайдено');
        }

        return hotel;
    }

    async update(id: string, updateHotelDto: UpdateHotelDto) {
        await this.findOne(id);

        return this.prisma.hotel.update({
            where: { id },
            data: updateHotelDto,
            include: {
                rooms: true,
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        await this.prisma.hotel.delete({
            where: { id },
        });

        return { message: 'Готель успішно видалено' };
    }
}