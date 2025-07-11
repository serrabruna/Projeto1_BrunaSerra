import { CursoService } from "../service/CursoService";
import { Request, Response } from "express";

export class CursoController{
    private cursoService = new CursoService();

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
}