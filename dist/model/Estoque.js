"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    codigo;
    livro_isbn;
    quantidade;
    quantidade_emprestada;
    status;
    constructor(codigo, livro_isbn, quantidade, quantidade_emprestada) {
        this.codigo = codigo;
        this.livro_isbn = livro_isbn;
        this.quantidade = quantidade;
        this.quantidade_emprestada = quantidade_emprestada;
        this.status = 'disponivel';
    }
}
exports.Estoque = Estoque;
