import { EmprestimoService } from "../service/EmprestimoService";
import { Request, Response } from "express";

export class EmprestimoController{
    private emprestimoService = new EmprestimoService;

    async criarEmprestimo(req: Request, res: Response): Promise<void>{
        try{
            const { cpfUsuario, codigoExemplar } = req.body;
            const emprestimo = await this.emprestimoService.registrarEmprestimo(cpfUsuario, codigoExemplar);
            res.status(201).json(emprestimo);
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

    async listarEmprestimos(req: Request, res: Response): Promise<void>{
        try{
            const emprestimo = await this.emprestimoService.listarEmprestimos();
            res.status(201).json(emprestimo);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar empréstimos";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async registrarDevolucao(req: Request, res: Response): Promise<void>{
        const id = parseInt(req.params.id);
        try{
            const emprestimo = await this.emprestimoService.registrarDevolucao(id);
            res.status(201).json(emprestimo);
        }
        catch(error: unknown){
            let message: string = "Não foi possível registrar devolucao";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}