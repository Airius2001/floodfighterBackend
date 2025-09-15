import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpModule } from '@nestjs/axios';
import { WaterDataService } from './water-data.service';
import { WaterDataController } from './water-data.controller';

import { FloodController } from './flood.controller';
import { FloodService } from './flood.service';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { GeoController } from './geo.controller';
import { GeoService } from './geo.service';

@Module({
  imports: [HttpModule],
  controllers: [WaterDataController, FloodController, WeatherController, GeoController],
  providers: [WaterDataService, FloodService, WeatherService, GeoService]
})
export class AppModule {}
