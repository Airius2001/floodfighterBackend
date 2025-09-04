import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FloodService {
  private API_URL =
    'https://hosting.wsapi.cloud.bom.gov.au/arcgis/rest/services/flood/National_Flood_Gauge_Network/FeatureServer/1/query';

  // Cache (optimization)
  private cache: { timestamp: number; data: any[] } | null = null;
  private cacheTTL = 1000 * 60 * 60; // cache 1 hour

  async getFloodCatchments() {
    // If the cache exists and is not expired, return the cache directly.
    if (this.cache && Date.now() - this.cache.timestamp < this.cacheTTL) {
      return this.cache.data;
    }

    // Otherwise call the API
    const batchSize = 300;
    let result: any[] = [];
    let offset = 0;

    try {
      while (true) {
        const response = await axios.get(this.API_URL, {
          params: {
            f: 'json',
            where: '1=1',
            outFields: '*',
            returnGeometry: true,
            resultOffset: offset,
            resultRecordCount: batchSize,
          },
        });

        const features = Array.isArray(response.data.features) ? response.data.features : [];
        if (features.length === 0) break;

        result = result.concat(
          features.map((feat) => ({
            name: feat.attributes.dist_name || 'Unknown',
            geometry: feat.geometry,
          })),
        );

        offset += batchSize;
      }

      // Cache stored
      this.cache = { timestamp: Date.now(), data: result };

      return result;
    } catch (err) {
      console.error('Error fetching flood catchments:', err);
      throw err;
    }
  }
}
