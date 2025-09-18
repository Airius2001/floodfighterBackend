import { Controller, Get } from '@nestjs/common';
import { RainfallService } from './rainfall.service';

@Controller('rainfall')
export class RainfallController {
  constructor(private readonly rainfallService: RainfallService) {}

  @Get()
  async getRainfall() {
    return this.rainfallService.getRainfall();
  }
}
