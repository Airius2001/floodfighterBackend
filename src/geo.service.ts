import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeoService {
  async getCoordinates(postcode: string) {
    try {
      const geoRes = await axios.get('https://nominatim.openstreetmap.org/search', {
  params: {
    q: `${postcode}, Australia`,
    format: 'json',
    limit: 1,
  },
});


      if (!geoRes.data.length) {
        throw new HttpException('Invalid postcode', 400);
      }

      const { lat, lon, display_name } = geoRes.data[0];

      return {
        postcode,
        latitude: lat,
        longitude: lon,
        location: display_name,
        raw: geoRes.data,
      };
    } catch (err) {
      console.error(err);
      throw new HttpException('Failed to fetch geocoding data', 500);
    }
  }
}
