import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
    constructor(private prisma: PrismaService) { }

    async create(createRoomDto: CreateRoomDto) {
        return this.prisma.room.create({
            data: createRoomDto,
            include: {
                hotel: true,
            },
        });
    }

    async findAll(hotelId?: string) {
        const where = hotelId ? { hotelId } : {};

        return this.prisma.room.findMany({
            where,
            include: {
                hotel: {
                    select: {
                        id: true,
                        name: true,
                        location: true,
                    },
                },
            },
        });
    }

    async findOne(id: string) {
        const room = await this.prisma.room.findUnique({
            where: { id },
            include: {
                hotel: true,
            },
        });

        if (!room) {
            throw new NotFoundException('Кімнату не знайдено');
        }

        return room;
    }

    async update(id: string, updateRoomDto: UpdateRoomDto) {
        await this.findOne(id);

        return this.prisma.room.update({
            where: { id },
            data: updateRoomDto,
            include: {
                hotel: true,
            },
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        await this.prisma.room.delete({
            where: { id },
        });

        return { message: 'Кімнату успішно видалено' };
    }
}