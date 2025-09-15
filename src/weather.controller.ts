import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getFloodRisk(@Query('lat') lat: string, @Query('lon') lon: string) {
    if (!lat || !lon) {
      return { error: 'Latitude and Longitude are required' };
    }
    return this.weatherService.getFloodRisk(Number(lat), Number(lon));
  }
}
