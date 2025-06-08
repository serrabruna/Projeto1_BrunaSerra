"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
class UsuarioController {
    usuarioService = new UsuarioService_1.UsuarioService();
    criarUsuario(req, res) {
        try {
            const usuario = this.usuarioService.cadastrarUsuario(req.body);
            res.status(201).json(usuario);
        }
        catch (error) {
            let message = "Não foi possível criar o registro";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    listarUsuario(req, res) {
        try {
            const filtros = req.query;
            const usuario = this.usuarioService.listarUsuarioComFiltro(filtros);
            res.status(201).json(usuario);
        }
        catch (error) {
            let message = "Não foi possível listar os usuários";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    buscarUsuario(req, res) {
        const cpf = req.params.cpf;
        try {
            const usuario = this.usuarioService.buscarUsuario(cpf);
            res.status(201).json(usuario);
        }
        catch (error) {
            let message = "Não foi possível retornar o usuário";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    atualizarUsuario(req, res) {
        const cpf = req.params.cpf;
        try {
            const usuario = this.usuarioService.atualizarUsuario(cpf, req.body);
            res.status(201).json(usuario);
        }
        catch (error) {
            let message = "Não foi possível atualizar usuário";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    removerUsuario(req, res) {
        const cpf = req.params.codigo;
        try {
            const usuario = this.usuarioService.removerUsuario(cpf);
            res.status(204).send();
        }
        catch (error) {
            let message = "Não foi possível remover usuário";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.UsuarioController = UsuarioController;
