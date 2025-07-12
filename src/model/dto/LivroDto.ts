export class LivroDto{
    id?: number;
    isbn: string;
    titulo: string;
    autor: string;
    editora: string;
    edicao: string;
    categoriaId: number;

    constructor(isbn: string, titulo: string, autor: string, editora: string, edicao: string, categoriaId: number, id?: number){
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoriaId = categoriaId;
        this.id = id;
    }
}