export class Estoque{
    static proximoCodigo: number = 0;

    codigo: number;
    livro_isbn: string;
    quantidade: number;
    quantidade_emprestada: number;
    status: 'disponivel' | 'emprestado';

    constructor(livro_isbn: string, quantidade: number, quantidade_emprestada: number){
        this.codigo = Estoque.proximoCodigo++;
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.status = 'disponivel';
    }
}