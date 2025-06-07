"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroController = void 0;
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
class CategoriaLivroController {
    categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
    listarCategorias(req, res) {
        try {
            const categoria = this.categoriaLivroService.listarCategorias();
            res.status(201).json(categoria);
        }
        catch (error) {
            let message = "Não foi possível listar as categorias";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.CategoriaLivroController = CategoriaLivroController;
