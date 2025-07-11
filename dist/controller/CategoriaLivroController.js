"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroController = void 0;
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
class CategoriaLivroController {
    categoriaLivroService = new CategoriaLivroService_1.CategoriaLivroService();
    async criarCategoriaLivro(req, res) {
        try {
            const { nome } = req.body;
            const catLivro = await this.categoriaLivroService.cadastrarCategoria(nome);
            res.status(201).json(catLivro);
        }
        catch (error) {
            let message = "Não foi possível criar o registro";
            if (error instanceof Error) {
                message = error.message;
                4;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    async listarCategorias(req, res) {
        try {
            const categoria = await this.categoriaLivroService.listarCategorias();
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
    async deletarCategoria(req, res) {
        const id = parseInt(req.params.id);
        try {
            const categoria = await this.categoriaLivroService.deletarCategoria(id);
            res.status(204).send();
        }
        catch (error) {
            let message = "Não foi possível remover categoria";
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
