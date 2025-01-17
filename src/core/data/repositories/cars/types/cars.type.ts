interface ICar {
    codigo: string;
    nome: string;
}

type CarsResponseApi = ICar[];

export { ICar, CarsResponseApi };
