"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
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
            const categoria = await this.categoriaUsuRepository.buscarPorId(id);
            if (!categoria) {
                throw new Error("Categoria de usuário não encontrada.");
            }
            return categoria;
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
            const usuarioRepository = (await Promise.resolve().then(() => __importStar(require("../repository/UsuarioRepository")))).UsuarioRepository.getInstance();
            const usuariosVinculados = await usuarioRepository.listarUsuarios();
            const temUsuariosVinculados = usuariosVinculados.some(user => user.categoriaId === id);
            if (temUsuariosVinculados) {
                throw new Error("Não é possível deletar a categoria: existem usuários vinculados a ela.");
            }
            const deletada = await this.categoriaUsuRepository.deletarCategoria(id); // Assume que o repositório tem este método
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
