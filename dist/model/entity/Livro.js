"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Livro = void 0;
class Livro {
    static proximoId = 0;
    id;
    isbn;
    titulo;
    autor;
    editora;
    edicao;
    categoriaId;
    constructor(isbn, titulo, autor, editora, edicao, categoriaId) {
        this.id = Livro.proximoId++;
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoriaId = categoriaId;
    }
}
exports.Livro = Livro;
