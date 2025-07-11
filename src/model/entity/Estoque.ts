export class Estoque{
    codigo?: number;
    livro_isbn: string;
    quantidade: number;
    quantidade_emprestada: number;
    status: 'disponivel' | 'emprestado';

    constructor(livro_isbn: string, quantidade: number, quantidade_emprestada: number, codigo?: number){
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.status = 'disponivel';
        this.codigo = codigo;
    }
}