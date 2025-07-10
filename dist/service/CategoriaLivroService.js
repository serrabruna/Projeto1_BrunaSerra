"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroService = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class CategoriaLivroService {
    categoriaLivroRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    async listarCategorias() {
        return await this.categoriaLivroRepository.listarCategorias();
    }
    async buscarPorId(id) {
        return await this.categoriaLivroRepository.buscarPorId(id);
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
