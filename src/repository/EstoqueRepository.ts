import {Estoque} from '../model/Estoque';

export class EstoqueRepository{
    private static instance: EstoqueRepository;
    private exemplares: Estoque[] = [];

    private constructor(){}

    public static getInstance(): EstoqueRepository{
        if(!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }

    InserirExemplar(exemplar: Estoque){
        this.exemplares.push(exemplar);
    }

    buscarPorCodigo(codigo:string): Estoque | undefined{
        return this.exemplares.find(exemplar => exemplar.codigo === codigo);
    }

    listarEstoque(): Estoque[]{
        return this.exemplares;
    }
}