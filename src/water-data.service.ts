import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WaterDataService {
  constructor(private httpService: HttpService) {}

  async getWaterData(): Promise<any> {
    const url = 'https://hosting.wsapi.cloud.bom.gov.au/arcgis/rest/services/Australia_Water_Storages/MapServer/0/query';
    const params = {
      where: '1=1',
      outFields: '*',
      f: 'json',
    };
    const response = await firstValueFrom(this.httpService.get(url, { params }));
    return response.data;
  }
}