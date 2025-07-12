"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroService = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class CategoriaLivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    async listarCategorias() {
        try {
            return await this.categoriaLivroRepository.listarCategorias();
        }
        catch (error) {
            console.error("Erro ao listar categorias no repositório");
            throw error;
        }
    }
    async buscarPorId(id) {
        try {
            return await this.categoriaLivroRepository.buscarPorId(id);
        }
        catch (error) {
            console.error("Erro ao buscar categoria por ID no repositório");
            throw error;
        }
    }
    async cadastrarCategoria(nome) {
        if (typeof nome !== 'string' || nome.trim() === '') {
            throw new Error("O nome da categoria é obrigatório e deve ser uma string não vazia.");
        }
        try {
            const todasCategorias = await this.categoriaLivroRepository.listarCategorias();
            const categoriaExistente = todasCategorias.find(cat => cat.nome.toLowerCase() === nome.toLowerCase());
            if (categoriaExistente) {
                throw new Error(`A categoria já existe.`);
            }
            const novaCategoria = await this.categoriaLivroRepository.insertCategoriaLivro(nome);
            return novaCategoria;
        }
        catch (error) {
            console.error("Erro ao cadastrar categoria no serviço: ", error);
            throw error;
        }
    }
    async deletarCategoria(id) {
        try {
            const categoria = await this.categoriaLivroRepository.buscarPorId(id);
            if (!categoria) {
                throw new Error("Categoria de livro não encontrada para exclusão.");
            }
            const livrosVinculados = await this.livroRepository.listarLivros();
            const temLivrosVinculados = livrosVinculados.some(livro => livro.categoriaId === id);
            if (temLivrosVinculados) {
                throw new Error("Não é possível deletar a categoria: existem livros vinculados a ela.");
            }
            const deletada = await this.categoriaLivroRepository.deletarCategoria(id);
            if (!deletada) {
                throw new Error("Erro inesperado ao deletar a categoria de livro.");
            }
            return deletada;
        }
        catch (error) {
            console.error("Erro ao deletar categoria de livro no serviço: ", error);
            throw error;
        }
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
