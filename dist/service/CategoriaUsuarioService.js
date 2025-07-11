"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
class CategoriaUsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaUsuRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    async listarCategorias() {
        try {
            return await this.categoriaUsuRepository.listarCategorias();
        }
        catch (error) {
            console.error("Erro ao listar categorias no serviço: ", error);
            throw error;
        }
    }
    async buscarPorId(id) {
        try {
            return await this.categoriaUsuRepository.buscarPorId(id);
        }
        catch (error) {
            console.error("Erro ao buscar categoria de usuário no serviço: ", error);
            throw error;
        }
    }
    async cadastrarCategoria(nome) {
        if (typeof nome !== 'string' || nome.trim() === '') {
            throw new Error("O nome da categoria é obrigatório e deve ser uma string não vazia.");
        }
        try {
            const todasCategorias = await this.categoriaUsuRepository.listarCategorias();
            const categoriaExistente = todasCategorias.find(cat => cat.nome.toLowerCase() === nome.toLowerCase());
            if (categoriaExistente) {
                throw new Error(`A categoria já existe.`);
            }
            const novaCategoria = await this.categoriaUsuRepository.insertCategoriaUsuario(nome);
            return novaCategoria;
        }
        catch (error) {
            console.error("Erro ao cadastrar categoria no serviço: ", error);
            throw error;
        }
    }
    async deletarCategoria(id) {
        try {
            const categoria = await this.categoriaUsuRepository.buscarPorId(id);
            if (!categoria) {
                throw new Error("Categoria de usuário não encontrada para exclusão.");
            }
            const usuariosVinculados = await this.usuarioRepository.listarUsuarios();
            const temUsuariosVinculados = usuariosVinculados.some(user => user.categoriaId === id);
            if (temUsuariosVinculados) {
                throw new Error("Não é possível deletar a categoria: existem usuários vinculados a ela.");
            }
            const deletada = await this.categoriaUsuRepository.deletarCategoria(id);
            if (!deletada) {
                throw new Error("Erro inesperado ao deletar a categoria de usuário.");
            }
            return deletada;
        }
        catch (error) {
            console.error("Erro ao deletar categoria de usuário no serviço: ", error);
            throw error;
        }
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
