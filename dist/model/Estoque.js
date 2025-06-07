"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Estoque = void 0;
class Estoque {
    id;
    isbnLivro;
    quantidade;
    quantidadeEmprestada;
    status;
    constructor(id, isbnLivro, quantidade, quantidadeEmprestada) {
        this.id = id;
        this.isbnLivro = isbnLivro;
        this.quantidade = quantidade;
        this.quantidadeEmprestada = quantidadeEmprestada;
        this.status = 'disponivel';
    }
}
exports.Estoque = Estoque;
