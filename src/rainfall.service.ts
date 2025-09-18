import { Injectable, HttpException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RainfallService {
  private readonly url =
    'https://www.bom.gov.au/web01/ncc/www/cli_chg/timeseries/rain/0112/aus/latest.txt';

  async getRainfall() {
    try {
      const res = await axios.get(this.url, {
        headers: {
          'User-Agent': 'NestJS Server',   // 👈 Pretend to be a browser
          'Accept': 'text/plain',
        },
      });

      const lines = res.data
        .split('\n')
        .filter((line: string) => line.trim() !== '' && !line.startsWith('#'));

      return lines.map((line: string) => {
        const [dateRange, value] = line.trim().split(/\s+/);
        return {
          year: dateRange.substring(0, 4),
          total: parseFloat(value),
        };
      });
    } catch (err) {
      console.error('Rainfall fetch error:', err.message);
      throw new HttpException('Failed to fetch rainfall data', 500);
    }
  }
}
