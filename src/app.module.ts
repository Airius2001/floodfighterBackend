import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpModule } from '@nestjs/axios';
import { WaterDataService } from './water-data.service';
import { WaterDataController } from './water-data.controller';

@Module({
  imports: [HttpModule],
  controllers: [WaterDataController],
  providers: [WaterDataService],
})
export class AppModule {}
