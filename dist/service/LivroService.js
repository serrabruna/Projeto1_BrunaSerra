"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const Livro_1 = require("../model/entity/Livro");
const LivroRepository_1 = require("../repository/LivroRepository");
const CategoriaLivroService_1 = require("./CategoriaLivroService");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueService_1 = require("./EstoqueService");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaService = new CategoriaLivroService_1.CategoriaLivroService();
    estoqueService = new EstoqueService_1.EstoqueService();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    async AdicionarLivro(livroData) {
        const { isbn, titulo, autor, editora, edicao, categoriaId } = livroData;
        if (!titulo || !autor || !editora || !edicao || !isbn || !categoriaId) {
            throw new Error("Informações incompletas para cadastrar livro.");
        }
        const categoria = await this.categoriaService.buscarPorId(categoriaId);
        if (!categoria) {
            throw new Error("Categoria inválida!");
        }
        const livroPorISBN = await this.livroRepository.buscarLivroPorISBN(isbn);
        if (livroPorISBN) {
            throw new Error("Livro com esse ISBN já existe!");
        }
        const livrosExistentesPorDetalhes = await this.livroRepository.buscarLivroPorAutorEditoraEdicao(autor, editora, edicao);
        if (livrosExistentesPorDetalhes && livrosExistentesPorDetalhes.length > 0) {
            throw new Error("Já existe um livro com este autor, editora e edição!");
        }
        const novoLivro = await this.livroRepository.insertLivro(isbn, titulo, autor, editora, edicao, categoriaId);
        return novoLivro;
    }
    async listarLivroComFiltro(filtros) {
        const { isbn, titulo, autor, categoriaId } = filtros;
        const livros = await this.livroRepository.listarLivros();
        return livros.filter((livro) => {
            const combinaISBN = isbn ? livro.isbn.toLowerCase().includes(isbn.toLowerCase()) : true;
            const combinaTitulo = titulo ? livro.titulo.toLowerCase().includes(titulo.toLowerCase()) : true;
            const combinaAutor = autor ? livro.autor.toLowerCase().includes(autor.toLowerCase()) : true;
            const combinaCatId = categoriaId ? livro.categoriaId === categoriaId : true;
            return combinaISBN && combinaTitulo && combinaAutor && combinaCatId;
        });
    }
    async buscarLivroPorISBN(isbn) {
        const livro = await this.livroRepository.buscarLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        return livro;
    }
    async atualizarLivro(isbn, novosDados) {
        const livro = await this.livroRepository.buscarLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado!");
        }
        if (!novosDados.titulo &&
            !novosDados.autor &&
            !novosDados.editora &&
            !novosDados.edicao &&
            !novosDados.categoriaId) {
            throw new Error("Nenhum dado informado para atualização.");
        }
        if (novosDados.isbn && novosDados.isbn !== isbn) {
            throw new Error("Não é permitido alterar o ISBN do livro.");
        }
        if (novosDados.categoriaId) {
            const categoria = await this.categoriaService.buscarPorId(novosDados.categoriaId);
            if (!categoria) {
                throw new Error("Categoria Inválida!");
            }
        }
        const livroComNovosDados = new Livro_1.Livro(livro.isbn, novosDados.titulo ?? livro.titulo, novosDados.autor ?? livro.autor, novosDados.editora ?? livro.editora, novosDados.edicao ?? livro.edicao, novosDados.categoriaId ?? livro.categoriaId, livro.id);
        const livroAtualizado = await this.livroRepository.atualizarDadosLivro(livroComNovosDados);
        if (!livroAtualizado) {
            throw new Error("Erro inesperado ao atualizar livro!");
        }
        return livroAtualizado;
    }
    async removerLivro(isbn) {
        const livro = await this.livroRepository.buscarLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        const todosOsExemplares = await this.estoqueRepository.listarEstoque();
        const exemplaresVinculadosAoLivro = todosOsExemplares.filter((e) => e.livro_isbn === isbn);
        if (exemplaresVinculadosAoLivro.length > 0) {
            throw new Error("Não é possível remover o livro: existem exemplares vinculados no estoque.");
        }
        const emprestimos = await this.emprestimoRepository.listarEmprestimos();
        if (exemplaresVinculadosAoLivro.length > 0) {
            const temExemplarEmprestado = exemplaresVinculadosAoLivro.some(e => e.status === 'emprestado');
            if (temExemplarEmprestado) {
                throw new Error("Não é possível remover o livro: existem exemplares emprestados no estoque.");
            }
            throw new Error("Não é possível remover o livro: existem exemplares vinculados no estoque (não emprestados).");
        }
        const removido = await this.livroRepository.removerLivro(isbn);
        if (!removido) {
            throw new Error("Erro inesperado ao remover livro ou livro não encontrado no repositório.");
        }
    }
}
exports.LivroService = LivroService;
