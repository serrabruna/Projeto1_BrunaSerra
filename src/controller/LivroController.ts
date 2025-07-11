import { LivroService } from "../service/LivroService";
import { Request, Response } from "express";

export class LivroController{
    private livroService = new LivroService();

    async criarLivro(req: Request, res: Response): Promise<void>{
        try{
            const livro = await this.livroService.AdicionarLivro(req.body);
            res.status(201).json(livro);
        }catch(error: unknown){
            let message: string = "Não foi possível criar o registro";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async listarLivro(req: Request, res: Response): Promise<void>{
        try{
            const filtros = req.query;
            const livro = await this.livroService.listarLivroComFiltro(filtros);
            res.status(201).json(livro);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar os livros";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async buscarLivro(req: Request, res: Response): Promise<void>{
        const isbn = req.params.isbn;
        try{
            const livro = await this.livroService.buscarLivroPorISBN(isbn);
            res.status(201).json(livro);
        }
        catch(error: unknown){
            let message: string = "Não foi possível retornar o livro";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async atualizarLivro(req: Request, res: Response): Promise<void>{
        const isbn = req.params.isbn;
        try{
            const livro = await this.livroService.atualizarLivro(isbn, req.body);
            res.status(201).json(livro);
        }
        catch(error: unknown){
            let message: string = "Não foi possível atualizar informações do livro";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async removerLivro(req: Request, res: Response): Promise<void>{
        const isbn = req.params.isbn;
        try{
            const livro = await this.livroService.removerLivro(isbn);
            res.status(204).send();
        }
        catch(error: unknown){
            let message: string = "Não foi possível remover livro";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}