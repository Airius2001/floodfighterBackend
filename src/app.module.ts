import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpModule } from '@nestjs/axios';
import { WaterDataService } from './water-data.service';
import { WaterDataController } from './water-data.controller';

import { FloodController } from './flood.controller';
import { FloodService } from './flood.service';

@Module({
  imports: [HttpModule],
  controllers: [WaterDataController, FloodController],
  providers: [WaterDataService, FloodService],
})
export class AppModule {}
