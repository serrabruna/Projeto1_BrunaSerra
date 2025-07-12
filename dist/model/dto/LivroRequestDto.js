"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRequestDto = void 0;
class LivroRequestDto {
    isbn;
    titulo;
    autor;
    editora;
    edicao;
    categoriaId;
    constructor(isbn, titulo, autor, editora, edicao, categoriaId, id) {
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoriaId = categoriaId;
    }
}
exports.LivroRequestDto = LivroRequestDto;
