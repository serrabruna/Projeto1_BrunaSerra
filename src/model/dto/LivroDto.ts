export class LivroDto{
    id?: number;
    isbn: string;
    titulo: string;
    autor: string;
    editora: string;
    edicao: string;
    categoriaId: number;

    constructor(isbn: any, titulo: any, autor: any, editora: any, edicao: any, categoriaId: any, id?: any){
        this.isbn = isbn;
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoriaId = categoriaId;
        this.id = id;
    }
}