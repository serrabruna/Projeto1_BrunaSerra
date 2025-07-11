import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { Request, Response } from "express";

export class CategoriaUsuarioController{
    private catUsuService = new CategoriaUsuarioService();

    async listarCategorias(req: Request, res: Response): Promise<void>{
        try{
            const categoria = await this.catUsuService.listarCategorias();
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
}