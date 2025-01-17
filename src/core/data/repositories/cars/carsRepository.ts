import { handleError } from '@/core/utils/handleError';
import { createClientHttpWithUrl } from '@/core/services/client-http';
import { CarsResponseApi } from "./types/cars.type";
import { IFipeRepositoryInterface } from './interface/ICars';

class CarsRepository implements IFipeRepositoryInterface {

  customApiUrl: string;
  customParam: string;

  constructor({
    customApiUrl,
    customParam,
  }: {
    customApiUrl?: string;
    customParam?: string;
  }) {
    this.customApiUrl = customApiUrl || '';
    this.customParam = customParam || '';
  }

  async getCarsData(): Promise<CarsResponseApi> {

    const url = `https://${this.customApiUrl}`;

    const customClient = createClientHttpWithUrl(url);

    try {

      const response = await customClient.get<CarsResponseApi>(`${this.customParam}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error during getCarBrands process:", error);
      throw handleError(error);
    }

  }
}

export { CarsRepository };
