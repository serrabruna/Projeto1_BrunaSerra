"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    static instance;
    livros = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    InserirLivro(livro) {
        this.livros.push(livro);
    }
    buscarLivroPorISBN(isbn) {
        return this.livros.find(livro => livro.isbn === isbn);
    }
    listarLivros() {
        return this.livros;
    }
}
exports.LivroRepository = LivroRepository;
