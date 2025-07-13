export class EstoqueDto{
    codigo: number;
    livro_isbn: string;
    quantidade: number;
    quantidade_emprestada: number;
    status: 'disponivel' | 'emprestado';

    constructor(codigo: any, livro_isbn: any, quantidade: any, quantidade_emprestada: any){
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.status = 'disponivel';
        this.codigo = codigo
    }
}