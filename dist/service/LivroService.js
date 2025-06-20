"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../model/Livro");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaLivroService_1 = require("./CategoriaLivroService");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaService = new CategoriaLivroService_1.CategoriaLivroService();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    AdicionarLivro(livroData) {
        const { isbn, titulo, autor, editora, edicao, categoriaId } = livroData;
        if (!titulo || !autor || !editora || !edicao || !isbn || !categoriaId) {
            throw new Error("Informações incompletas para cadastrar livro.");
        }
        const categoria = this.categoriaService.buscarPorId(categoriaId);
        if (!categoria) {
            throw new Error("Categoria inválida!");
        }
        if (this.livroRepository.buscarLivroPorISBN(isbn)) {
            throw new Error("Livro com esse ISBN já existe!");
        }
        const livroExistente = this.livroRepository.buscarLivroPorAutorEditoraEdicao(autor, editora, edicao);
        if (livroExistente) {
            throw new Error("Já existe um livro com este autor, editora e edição!");
        }
        const novoLivro = new Livro_1.Livro(isbn, titulo, autor, editora, edicao, categoriaId);
        this.livroRepository.inserirLivro(novoLivro);
        return novoLivro;
    }
    listarLivroComFiltro(filtros) {
        const { isbn, titulo, autor, categoriaId } = filtros;
        const livros = this.livroRepository.listarLivros();
        return livros.filter(livro => {
            const combinaISBN = isbn ? livro.isbn.toLowerCase().includes(isbn.toLowerCase()) : true;
            const combinaTitulo = titulo ? livro.titulo.toLowerCase().includes(titulo.toLowerCase()) : true;
            const combinaAutor = autor ? livro.autor.toLowerCase().includes(autor.toLowerCase()) : true;
            const combinaCatId = categoriaId ? livro.categoriaId === categoriaId : true;
            return combinaISBN && combinaTitulo && combinaAutor && combinaCatId;
        });
    }
    buscarLivroPorISBN(isbn) {
        const livro = this.livroRepository.buscarLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        return livro;
    }
    atualizarLivro(isbn, novosDados) {
        const livro = this.livroRepository.buscarLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado!");
        }
        if (!novosDados.titulo && !novosDados.autor && !novosDados.editora && !novosDados.edicao && !novosDados.categoriaId) {
            throw new Error("Nenhum dado informado para atualização.");
        }
        if (novosDados.isbn && novosDados.isbn !== isbn) {
            throw new Error("Não é permitido alterar o ISBN do livro.");
        }
        if (novosDados.categoriaId) {
            const categoria = this.categoriaService.buscarPorId(novosDados.categoriaId);
            if (!categoria) {
                throw new Error("Categoria Inválida!");
            }
        }
        const livroAtualizado = this.livroRepository.atualizarDadosLivro(isbn, novosDados);
        if (!livroAtualizado) {
            throw new Error("Erro inesperado ao atualizar livro!");
        }
        return livroAtualizado;
    }
    removerLivro(isbn) {
        const livro = this.livroRepository.buscarLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        const exemplares = this.estoqueRepository.listarEstoque().filter(e => e.livro_isbn === isbn);
        if (exemplares.length > 0) {
            throw new Error("Não é possível remover o livro: existem exemplares vinculados no estoque.");
        }
        const emprestimos = this.emprestimoRepository.listarEmprestimos();
        const emprestimosAtivos = emprestimos.filter(e => {
            const exemplar = this.estoqueRepository.buscarPorCodigo(e.codigoExemplar);
            return exemplar && exemplar.livro_isbn === isbn && !e.dataEntrega;
        });
        if (emprestimosAtivos.length > 0) {
            throw new Error("Não é possível remover o livro: existem empréstimos ativos.");
        }
        this.livroRepository.removerLivro(isbn);
    }
}
exports.LivroService = LivroService;
