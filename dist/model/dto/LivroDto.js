"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroDto = void 0;
class LivroDto {
    id;
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
        this.id = id;
    }
}
exports.LivroDto = LivroDto;
