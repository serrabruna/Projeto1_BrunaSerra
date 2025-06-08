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

    inserirExemplar(exemplar: Estoque){
        this.exemplares.push(exemplar);
    }

    buscarPorCodigo(codigo: number): Estoque | undefined{
        return this.exemplares.find(exemplar => exemplar.codigo === codigo);
    }

    listarEstoque(): Estoque[]{
        return this.exemplares;
    }

    listarDisponiveis(): Estoque[]{
        return this.exemplares.filter(e => e.status === "disponivel");
    }

    atualizarStatus(codigo: number, status: "emprestado" | "disponivel"): boolean {
        const exemplar = this.buscarPorCodigo(codigo);
        if (!exemplar) return false;
        exemplar.status = status;
        return true;
    }

    remover(codigo: number): boolean {
        const index = this.exemplares.findIndex(e => e.codigo === codigo);
        if (index === -1) return false;

        if (this.exemplares[index].status !== "disponivel") return false;

        this.exemplares.splice(index, 1);
        return true;
    }
}