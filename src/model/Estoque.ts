export class Estoque{
    static proximoId: number = 0;

    id: number;
    livro_id: number;
    quantidade: number;
    quantidade_emprestada: number;
    status: 'disponivel' | 'emprestado';

    constructor(id: string, livro_id: number, quantidade: number, quantidade_emprestada: number){
        this.id = Estoque.proximoId++;
        this.livro_id = livro_id;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.status = 'disponivel';
    }
}