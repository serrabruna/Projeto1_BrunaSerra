"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
class EstoqueController {
    estoqueService = new EstoqueService_1.EstoqueService;
    async criarExemplar(req, res) {
        try {
            const { codigo, livro_isbn } = req.body;
            const estoque = await this.estoqueService.cadastrarExemplar(codigo, livro_isbn);
            res.status(201).json(estoque);
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
    async listarDisponivel(req, res) {
        try {
            const estoque = await this.estoqueService.listarDisponiveis();
            res.status(201).json(estoque);
        }
        catch (error) {
            let message = "Não foi possível listar o estoque disponível";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    async buscarExemplar(req, res) {
        const codigo = parseInt(req.params.codigo);
        try {
            const estoque = await this.estoqueService.buscarExemplar(codigo);
            res.status(201).json(estoque);
        }
        catch (error) {
            let message = "Não foi possível retornar o estoque";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    async atualizarStatus(req, res) {
        const codigo = parseInt(req.params.codigo);
        try {
            const estoque = await this.estoqueService.atualizarStatus(codigo, req.body);
            res.status(201).json(estoque);
        }
        catch (error) {
            let message = "Não foi possível atualizar status do estoque";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    async resumoPorISBN(req, res) {
        try {
            const { isbn } = req.params;
            const resumo = await this.estoqueService.getResumoEstoque(isbn);
            res.status(200).json(resumo);
        }
        catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    async RemoverEstoque(req, res) {
        const codigo = parseInt(req.params.codigo);
        try {
            const estoque = await this.estoqueService.removerExemplar(codigo);
            res.status(204).send();
        }
        catch (error) {
            let message = "Não foi possível remover estoque";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.EstoqueController = EstoqueController;
