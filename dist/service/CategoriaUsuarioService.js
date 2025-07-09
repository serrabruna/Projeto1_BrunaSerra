"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    categoriaUsuRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    async listarCategorias() {
        return await this.categoriaUsuRepository.listarCategorias();
    }
    async buscarPorId(id) {
        return await this.categoriaUsuRepository.buscarPorId(id);
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
