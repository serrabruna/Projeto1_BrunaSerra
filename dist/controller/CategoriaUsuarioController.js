"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
class CategoriaUsuarioController {
    catUsuService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    async criarCategoriaUsuario(req, res) {
        try {
            const { nome } = req.body;
            const catUsuario = await this.catUsuService.cadastrarCategoria(nome);
            res.status(201).json(catUsuario);
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
            const categoria = await this.catUsuService.listarCategorias();
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
            const estoque = await this.catUsuService.deletarCategoria(id);
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
exports.CategoriaUsuarioController = CategoriaUsuarioController;
