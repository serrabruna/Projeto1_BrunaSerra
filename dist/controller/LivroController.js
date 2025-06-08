"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
class LivroController {
    livroService = new LivroService_1.LivroService();
    criarLivro(req, res) {
        try {
            const livro = this.livroService.AdicionarLivro(req.body);
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
    listarLivro(req, res) {
        try {
            const filtros = req.query;
            const livro = this.livroService.listarLivroComFiltro(filtros);
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
    buscarLivro(req, res) {
        const isbn = req.params.isbn;
        try {
            const livro = this.livroService.buscarLivroPorISBN(isbn);
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
    atualizarLivro(req, res) {
        const isbn = req.params.isbn;
        try {
            const livro = this.livroService.atualizarLivro(isbn, req.body);
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
    removerLivro(req, res) {
        const isbn = req.params.isbn;
        try {
            const livro = this.livroService.removerLivro(isbn);
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
