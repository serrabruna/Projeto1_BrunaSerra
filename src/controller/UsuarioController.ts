import { UsuarioService } from "../service/UsuarioService";
import { Request, Response } from "express";

export class UsuarioController{
    private usuarioService = new UsuarioService();

    async criarUsuario(req: Request, res: Response): Promise <void>{
        try{
            const usuario = await this.usuarioService.cadastrarUsuario(req.body);
            res.status(201).json(usuario);
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

    async listarUsuarios(req: Request, res: Response): Promise<void>{
        try{
            const usuario = await this.usuarioService.listarUsuarios();
            res.status(201).json(usuario);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar os usuários";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async listarUsuarioComFiltro(req: Request, res: Response): Promise<void>{
        try{
            const filtros = req.query;
            const usuario = await this.usuarioService.listarUsuarioComFiltro(filtros);
            res.status(201).json(usuario);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar os usuários";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async buscarUsuario(req: Request, res: Response): Promise<void>{
        const cpf = req.params.cpf;
        try{
            const usuario = await this.usuarioService.buscarUsuario(cpf);
            res.status(201).json(usuario);
        }
        catch(error: unknown){
            let message: string = "Não foi possível retornar o usuário";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async atualizarUsuario(req: Request, res: Response): Promise<void>{
        const cpf = req.params.cpf;
        try{
            const usuario = await this.usuarioService.atualizarUsuario(cpf, req.body);
            res.status(201).json(usuario);
        }
        catch(error: unknown){
            let message: string = "Não foi possível atualizar usuário";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async removerUsuario(req: Request, res: Response): Promise<void>{
        const cpf = req.params.cpf;
        try{
            const usuario = await this.usuarioService.removerUsuario(cpf);
            res.status(204).send();
        }
        catch(error: unknown){
            let message: string = "Não foi possível remover usuário";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}


