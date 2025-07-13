"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRequestDto = void 0;
class EstoqueRequestDto {
    codigo;
    livro_isbn;
    quantidade;
    quantidade_emprestada;
    status;
    constructor(codigo, livro_isbn, quantidade, quantidade_emprestada, status) {
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.codigo = codigo;
        this.status = status;
    }
}
exports.EstoqueRequestDto = EstoqueRequestDto;
