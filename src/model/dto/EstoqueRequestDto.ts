export class EstoqueRequestDto{
    codigo: number
    livro_isbn: string;
    quantidade?: number;
    quantidade_emprestada?: number;
    status?: 'disponivel' | 'emprestado'

    constructor(codigo: number, livro_isbn: string, quantidade?: number, quantidade_emprestada?: number, status?: 'disponivel' | 'emprestado'){
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.codigo = codigo;
        this.status = status
    }
}