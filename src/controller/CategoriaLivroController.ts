import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Request, Response } from "express";

export class CategoriaLivroController{
    private categoriaLivroService = new CategoriaLivroService();

    async criarCategoriaLivro(req: Request, res: Response): Promise <void>{
        try{
            const { nome } = req.body; 
            const catLivro = await this.categoriaLivroService.cadastrarCategoria(nome);
            res.status(201).json(catLivro);
        }catch(error: unknown){
            let message: string = "Não foi possível criar o registro";
            if(error instanceof Error){
                message = error.message;4
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async listarCategorias(req: Request, res: Response): Promise<void>{
        try{
            const categoria = await this.categoriaLivroService.listarCategorias();
            res.status(201).json(categoria);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar as categorias";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async deletarCategoria(req: Request, res: Response): Promise<void>{
        const id = parseInt(req.params.id);
        try{
            const categoria = await this.categoriaLivroService.deletarCategoria(id);
            res.status(204).send();
        }
        catch(error: unknown){
            let message: string = "Não foi possível remover categoria";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
