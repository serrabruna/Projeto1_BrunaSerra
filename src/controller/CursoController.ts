import { CursoService } from "../service/CursoService";
import { Request, Response } from "express";

export class CursoController{
    private cursoService = new CursoService();

    async criarCurso(req: Request, res: Response): Promise <void>{
        try{
            const { nome } = req.body; 
            const curso = await this.cursoService.cadastrarCurso(nome);
            res.status(201).json(curso);
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

    async listarCursos(req: Request, res: Response): Promise<void>{
        try{
            const curso = await this.cursoService.listarCursos();
            res.status(201).json(curso);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar os cursos";
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
            const curso = await this.cursoService.deletarCurso(id);
            res.status(204).send();
        }
        catch(error: unknown){
            let message: string = "Não foi possível remover curso";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

}