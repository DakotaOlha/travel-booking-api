import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TravelsModule } from './travels/travels.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, }), PrismaModule, AuthModule, UsersModule, TravelsModule, HotelsModule, RoomsModule, BookingsModule],
})

export class AppModule { }
