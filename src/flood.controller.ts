import { Controller, Get } from '@nestjs/common';
import { FloodService } from './flood.service';

@Controller('flood')
export class FloodController {
  constructor(private readonly floodService: FloodService) {}

  @Get('catchments')
  async getCatchments() {
    return this.floodService.getFloodCatchments();
  }
}