"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    isbn;
    titulo;
    autor;
    editora;
    edicao;
    categoria;
    constructor(isbn, titulo, autor, editora, edicao, categoria) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoria = categoria;
    }
}
exports.Livro = Livro;
