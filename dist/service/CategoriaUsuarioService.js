"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    categoriaUsuRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    listarCategorias() {
        return this.categoriaUsuRepository.listarCategorias();
    }
    buscarPorId(id) {
        return this.categoriaUsuRepository.buscarPorId(id);
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
