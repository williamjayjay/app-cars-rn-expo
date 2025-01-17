import { handleError } from '@/core/utils/handleError';
import { createClientHttpWithUrl } from '@/core/services/client-http';
import { ModelRepositoryInterface } from './interface/IModel';
import { ModelsResponseApi } from './types/model.type';

class ModelRepository implements ModelRepositoryInterface {

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

  async getModelData(): Promise<ModelsResponseApi> {

    const url = `https://${this.customApiUrl}`;

    const customClient = createClientHttpWithUrl(url);

    try {

      const response = await customClient.get<ModelsResponseApi>(`${this.customParam}`, {
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

export { ModelRepository };
