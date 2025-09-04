import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FloodService {
  private API_URL =
    'https://hosting.wsapi.cloud.bom.gov.au/arcgis/rest/services/flood/National_Flood_Gauge_Network/FeatureServer/1/query';

  async getFloodCatchments() {
    const batchSize = 300; // 200 requests per batch
    let result: any[] = [];
    let offset = 0;
    let total = Infinity;

    try {
      while (offset < total) {
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

        // Confirm return features
        const features = Array.isArray(response.data.features) ? response.data.features : [];

        features.forEach((feat, idx) => {
            console.log(`Feature ${offset + idx}:`, feat.attributes);
            });

        result = result.concat(features);

        // Set the next offset
        offset += batchSize;

        // Get totalCount
        if (total === Infinity && typeof response.data.exceededTransferLimit !== 'undefined') {
          // If the service supports totalCount
          total = response.data.exceededTransferLimit ? offset + batchSize : offset;
        }

        // If the features return empty, stop.
        if (features.length === 0) break;
      }

      // Mapped to the format required by the front end
      return result.map((feat) => ({
        name: feat.attributes.dist_name || 'Unknown',
        geometry: feat.geometry,
      }));
    } catch (err) {
      console.error('Error fetching flood catchments:', err);

      throw err;
    }
  }
}
