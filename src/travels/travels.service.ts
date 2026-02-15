import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTravelDto } from './dto/create-travel.dto';
import { UpdateTravelDto } from './dto/update-travel.dto';

@Injectable()
export class TravelsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createTravelDto: CreateTravelDto) {
        return this.prisma.travel.create({
            data: {
                ...createTravelDto,
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
    }

    async findAll(userId: string) {
        return this.prisma.travel.findMany({
            where: { userId },
            include: {
                bookings: {
                    include: {
                        hotel: true,
                    },
                },
            },
            orderBy: {
                startDate: 'desc',
            },
        });
    }

    async findOne(id: string, userId: string) {
        const travel = await this.prisma.travel.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                bookings: {
                    include: {
                        hotel: true,
                        room: true,
                    },
                },
            },
        });

        if (!travel) {
            throw new NotFoundException('Подорож не знайдено');
        }

        if (travel.userId !== userId) {
            throw new ForbiddenException('Доступ заборонено');
        }

        return travel;
    }

    async update(id: string, userId: string, updateTravelDto: UpdateTravelDto) {
        await this.findOne(id, userId);

        return this.prisma.travel.update({
            where: { id },
            data: updateTravelDto,
            include: {
                bookings: {
                    include: {
                        hotel: true,
                    },
                },
            },
        });
    }

    async remove(id: string, userId: string) {
        await this.findOne(id, userId);

        await this.prisma.travel.delete({
            where: { id },
        });

        return { message: 'Подорож успішно видалено' };
    }

    async getUserTravelHistory(userId: string) {
        const travels = await this.prisma.travel.findMany({
            where: { userId },
            include: {
                bookings: {
                    include: {
                        hotel: true,
                    },
                },
            },
            orderBy: {
                startDate: 'desc',
            },
        });

        return {
            total: travels.length,
            travels,
        };
    }
}