interface IModel {
    codigo: number;
    nome: string;
}

interface IYear {
    codigo: string;
    nome: string;
}

interface ModelsResponseApi {
    modelos: IModel[];
    anos: IYear[];
}

export { IModel, IYear, ModelsResponseApi };
