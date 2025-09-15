import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getFloodRisk(lat: number, lon: number) {
    try {
      const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          hourly: 'precipitation',
          timezone: 'auto',
        },
      });

      const hours = weatherRes.data.hourly.time;
      const precip = weatherRes.data.hourly.precipitation;

      const timeline = hours.map((t: string, i: number) => {
        const mm = precip[i];
        let risk = 'Low';
        if (mm > 3) risk = 'High';
        else if (mm > 1) risk = 'Medium';
        return { time: t, precipitation: mm, risk };
      });

      const overallRisk = timeline.some((t) => t.risk === 'High')
        ? 'High (Danger)'
        : timeline.some((t) => t.risk === 'Medium')
        ? 'Medium'
        : 'Low';

      return {
        latitude: lat,
        longitude: lon,
        status: overallRisk,
        timeline,
        raw: weatherRes.data,
      };
    } catch (err) {
      console.error(err);
      throw new HttpException('Failed to fetch weather data', 500);
    }
  }
}
