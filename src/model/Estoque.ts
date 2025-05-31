export class Estoque{
    codigo: string;
    isbnLivro: string;
    status: 'disponivel' | 'emprestado';

    constructor(codigo: string, isbnLivro: string){
        this.codigo = codigo;
        this.isbnLivro = isbnLivro;
        this.status = 'disponivel';
    }
}