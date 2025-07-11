"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
class EmprestimoController {
    emprestimoService = new EmprestimoService_1.EmprestimoService;
    async criarEmprestimo(req, res) {
        try {
            const { cpfUsuario, codigoExemplar } = req.body;
            const emprestimo = await this.emprestimoService.registrarEmprestimo(cpfUsuario, codigoExemplar);
            res.status(201).json(emprestimo);
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
    async listarEmprestimos(req, res) {
        try {
            const emprestimo = await this.emprestimoService.listarEmprestimos();
            res.status(201).json(emprestimo);
        }
        catch (error) {
            let message = "Não foi possível listar empréstimos";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    async registrarDevolucao(req, res) {
        const id = parseInt(req.params.id);
        try {
            const emprestimo = await this.emprestimoService.registrarDevolucao(id);
            res.status(201).json(emprestimo);
        }
        catch (error) {
            let message = "Não foi possível registrar devolucao";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.EmprestimoController = EmprestimoController;
