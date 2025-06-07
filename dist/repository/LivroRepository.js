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
    inserirLivro(livro) {
        this.livros.push(livro);
    }
    buscarLivroPorISBN(isbn) {
        return this.livros.find((livro) => livro.isbn === isbn);
    }
    buscarLivroPorAutorEditoraEdicao(autor, editora, edicao) {
        return this.livros.find(livro => livro.autor.toLowerCase() === autor.toLowerCase()
            && livro.editora.toLowerCase() === editora.toLowerCase() && livro.edicao === edicao);
    }
    listarLivros() {
        return this.livros;
    }
    atualizarDadosLivro(isbn, novosDados) {
        const livro = this.buscarLivroPorISBN(isbn);
        if (!livro)
            return undefined;
        if (novosDados.titulo) {
            livro.titulo = novosDados.titulo;
        }
        if (novosDados.autor) {
            livro.autor = novosDados.autor;
        }
        if (novosDados.editora) {
            livro.editora = novosDados.editora;
        }
        if (novosDados.edicao) {
            livro.edicao = novosDados.edicao;
        }
        if (novosDados.categoriaId) {
            livro.categoriaId = novosDados.categoriaId;
        }
        return livro;
    }
    removerLivro(isbn) {
        const index = this.livros.findIndex(l => l.isbn == isbn);
        if (index == -1) {
            return false;
        }
        this.livros.splice(index, 1);
        return true;
    }
}
exports.LivroRepository = LivroRepository;
