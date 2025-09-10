import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { FloodService } from './flood.service';

@Controller('flood')
export class FloodController {
  constructor(private readonly floodService: FloodService) {}

  @Get()
  async getCatchments() {
    try {
      return await this.floodService.getFloodCatchments();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve flood catchments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
