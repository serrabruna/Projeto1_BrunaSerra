"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    codigo;
    isbnLivro;
    status;
    constructor(codigo, isbnLivro) {
        this.codigo = codigo;
        this.isbnLivro = isbnLivro;
        this.status = 'disponivel';
    }
}
exports.Estoque = Estoque;
