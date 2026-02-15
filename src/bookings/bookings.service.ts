import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
    constructor(private prisma: PrismaService) { }

    async create(userId: string, createBookingDto: CreateBookingDto) {
        const { checkInDate, checkOutDate, roomId, hotelId, travelId, guestsCount } = createBookingDto;

        // Перевірка кімнати
        const room = await this.prisma.room.findUnique({
            where: { id: roomId },
        });

        if (!room) {
            throw new NotFoundException('Кімнату не знайдено');
        }

        if (!room.available) {
            throw new BadRequestException('Кімната недоступна для бронювання');
        }

        if (guestsCount > room.capacity) {
            throw new BadRequestException(
                `Кількість гостей перевищує місткість кімнати (${room.capacity})`,
            );
        }

        // Розрахунок кількості днів
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

        if (nights <= 0) {
            throw new BadRequestException('Дата виїзду повинна бути пізніше дати заїзду');
        }

        const totalPrice = nights * room.pricePerNight;

        // Створення бронювання
        return this.prisma.booking.create({
            data: {
                checkInDate,
                checkOutDate,
                totalPrice,
                guestsCount,
                specialRequests: createBookingDto.specialRequests,
                userId,
                hotelId,
                roomId,
                travelId: travelId || null,
            },
            include: {
                hotel: true,
                room: true,
                travel: true,
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
        return this.prisma.booking.findMany({
            where: { userId },
            include: {
                hotel: true,
                room: true,
                travel: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }

    async findOne(id: string, userId: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                hotel: true,
                room: true,
                travel: true,
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

        if (!booking) {
            throw new NotFoundException('Бронювання не знайдено');
        }

        if (booking.userId !== userId) {
            throw new ForbiddenException('Доступ заборонено');
        }

        return booking;
    }

    async update(id: string, userId: string, updateBookingDto: UpdateBookingDto) {
        const booking = await this.findOne(id, userId);

        if (booking.status === BookingStatus.CANCELLED) {
            throw new BadRequestException('Неможливо оновити скасоване бронювання');
        }

        if (booking.status === BookingStatus.COMPLETED) {
            throw new BadRequestException('Неможливо оновити завершене бронювання');
        }

        return this.prisma.booking.update({
            where: { id },
            data: updateBookingDto,
            include: {
                hotel: true,
                room: true,
                travel: true,
            },
        });
    }

    async remove(id: string, userId: string) {
        await this.findOne(id, userId);

        await this.prisma.booking.delete({
            where: { id },
        });

        return { message: 'Бронювання успішно видалено' };
    }

    async generateBookingReport(userId: string) {
        const bookings = await this.prisma.booking.findMany({
            where: { userId },
            include: {
                hotel: true,
                room: true,
            },
        });

        const totalBookings = bookings.length;
        const totalSpent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
        const byStatus = bookings.reduce((acc, b) => {
            acc[b.status] = (acc[b.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        return {
            totalBookings,
            totalSpent,
            byStatus,
            bookings,
        };
    }
}