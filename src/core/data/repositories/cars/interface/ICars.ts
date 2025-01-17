import { CarsResponseApi } from "../types/cars.type";

interface IFipeRepositoryInterface {
  getCarsData(): Promise<CarsResponseApi>;
}

export { IFipeRepositoryInterface };
