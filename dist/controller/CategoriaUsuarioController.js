"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
class CategoriaUsuarioController {
    catUsuService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    listarCategorias(req, res) {
        try {
            const categoria = this.catUsuService.listarCategorias();
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
exports.CategoriaUsuarioController = CategoriaUsuarioController;
