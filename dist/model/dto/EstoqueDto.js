"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueDto = void 0;
class EstoqueDto {
    codigo;
    livro_isbn;
    quantidade;
    quantidade_emprestada;
    status;
    constructor(codigo, livro_isbn, quantidade, quantidade_emprestada) {
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.status = 'disponivel';
        this.codigo = codigo;
    }
}
exports.EstoqueDto = EstoqueDto;
