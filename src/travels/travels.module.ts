import { Module } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { TravelsController } from './travels.controller';

@Module({
  providers: [TravelsService],
  controllers: [TravelsController]
})
export class TravelsModule {}
