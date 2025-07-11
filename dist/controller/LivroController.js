"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
class LivroController {
    livroService = new LivroService_1.LivroService();
    async criarLivro(req, res) {
        try {
            const livro = await this.livroService.AdicionarLivro(req.body);
            res.status(201).json(livro);
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
    async listarLivro(req, res) {
        try {
            const filtros = req.query;
            const livro = await this.livroService.listarLivroComFiltro(filtros);
            res.status(201).json(livro);
        }
        catch (error) {
            let message = "Não foi possível listar os livros";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    async buscarLivro(req, res) {
        const isbn = req.params.isbn;
        try {
            const livro = await this.livroService.buscarLivroPorISBN(isbn);
            res.status(201).json(livro);
        }
        catch (error) {
            let message = "Não foi possível retornar o livro";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    async atualizarLivro(req, res) {
        const isbn = req.params.isbn;
        try {
            const livro = await this.livroService.atualizarLivro(isbn, req.body);
            res.status(201).json(livro);
        }
        catch (error) {
            let message = "Não foi possível atualizar informações do livro";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    async removerLivro(req, res) {
        const isbn = req.params.isbn;
        try {
            const livro = await this.livroService.removerLivro(isbn);
            res.status(204).send();
        }
        catch (error) {
            let message = "Não foi possível remover livro";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.LivroController = LivroController;
