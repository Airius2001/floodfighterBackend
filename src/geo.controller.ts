import { Controller, Get, Query } from '@nestjs/common';
import { GeoService } from './geo.service';

@Controller('geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) {}

  @Get()
  async getCoordinates(@Query('postcode') postcode: string) {
    if (!postcode) {
      return { error: 'Postcode is required' };
    }
    return this.geoService.getCoordinates(postcode);
  }
}
