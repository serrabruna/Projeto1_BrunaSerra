export class Livro{
    isbn: string;
    titulo: string;
    autor: string;
    editora: string;
    edicao: string;
    categoria: string;

    constructor(isbn: string, titulo: string, autor: string, editora: string, edicao: string, categoria: string){
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoria = categoria;
    }
}