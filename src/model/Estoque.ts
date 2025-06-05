export class Estoque{
    id: string;
    isbnLivro: string;
    quantidade: number;
    quantidadeEmprestada: number;
    status: 'disponivel' | 'emprestado';

    constructor(id: string, isbnLivro: string, quantidade: number, quantidadeEmprestada: number){
        this.id = id;
        this.isbnLivro = isbnLivro;
        this.quantidade = quantidade;
        this.quantidadeEmprestada = quantidadeEmprestada;
        this.status = 'disponivel';
    }
}