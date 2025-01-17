import { ModelsResponseApi } from "../types/model.type";

interface ModelRepositoryInterface {
  getModelData(): Promise<ModelsResponseApi>;
}

export { ModelRepositoryInterface };
