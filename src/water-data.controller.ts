import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { WaterDataService } from './water-data.service';

@Controller('water-data')
export class WaterDataController {
  constructor(private readonly waterDataService: WaterDataService) {}

  @Get()
  async fetchData() {
    try {
      return await this.waterDataService.getWaterData();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve water data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
