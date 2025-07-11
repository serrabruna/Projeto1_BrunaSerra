import { EstoqueService } from "../service/EstoqueService";
import { Request, Response } from "express";

export class EstoqueController{
    private estoqueService = new EstoqueService;

    async adicionarAoEstoque(req: Request, res: Response): Promise<void>{
        try{
            const { livro_isbn, quantidade } = req.body;
            const estoque = await this.estoqueService.adicionarLivroAoEstoque(livro_isbn, quantidade);
            res.status(201).json(estoque);
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

    async listarDisponivel(req: Request, res: Response): Promise<void>{
        try{
            const estoque = await this.estoqueService.listarDisponiveis();
            res.status(201).json(estoque);
        }
        catch(error: unknown){
            let message: string = "Não foi possível listar o estoque disponível";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async buscarExemplar(req: Request, res: Response): Promise<void>{
        const codigo = parseInt(req.params.codigo);
        try{
            const estoque = await this.estoqueService.buscarEstoquePorCodigo(codigo);
            res.status(201).json(estoque);
        }
        catch(error: unknown){
            let message: string = "Não foi possível retornar o estoque";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async atualizarStatus(req: Request, res: Response): Promise<void>{
        const codigo = parseInt(req.params.codigo);
        const { status } = req.body;
        try{
            const estoque = await this.estoqueService.atualizarStatusEstoque(codigo, status);
            res.status(201).json(estoque);
        }
        catch(error: unknown){
            let message: string = "Não foi possível atualizar status do estoque";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }

    async resumoPorISBN(req: Request, res: Response): Promise<void> {
        try {
            const { isbn } = req.params;
            const resumo = await this.estoqueService.getResumoEstoque(isbn);
            res.status(200).json(resumo);
        } 
        catch (error: any){
            res.status(404).json({ message: error.message });
        }
    }

    async RemoverEstoque(req: Request, res: Response): Promise<void>{
        const codigo = parseInt(req.params.codigo);
        try{
            const estoque = await this.estoqueService.removerRegistroEstoque(codigo);
            res.status(204).send();
        }
        catch(error: unknown){
            let message: string = "Não foi possível remover estoque";
            if(error instanceof Error){
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}