import { EstoqueService } from "../service/EstoqueService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EstoqueDto } from "../model/dto/EstoqueDto";
import { EstoqueRequestDto } from "../model/dto/EstoqueRequestDto";
import { Estoque } from "../model/entity/Estoque";
import { Request, Response } from "express";

@Route("estoque")
@Tags("estoque")
export class EstoqueController{
    private estoqueService = new EstoqueService;

    @Post()
    async adicionarAoEstoque(
        @Body() dto: EstoqueRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void>{
        try{
            const estoque = await this.estoqueService.adicionarLivroAoEstoque(dto.livro_isbn, dto.quantidade);
            return success(201, new BasicResponseDto("Estoque cadastrado com sucesso!", estoque));
        }catch(error: any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("disponiveis")
    async listarDisponivel(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const estoque = await this.estoqueService.listarDisponiveis();
            return success(200, new BasicResponseDto("Estoque listado com sucesso!", estoque));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("codigo/{codigo}")
    async buscarExemplar(
        @Path() codigo: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const estoque = await this.estoqueService.buscarEstoquePorCodigo(codigo);
            return success(200, new BasicResponseDto("Estoque encontrado!", estoque));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put("codigo/{codigo}")
    async atualizarStatus(
        @Path() codigo: number,
        @Body() dto: EstoqueDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const estoque = await this.estoqueService.atualizarStatusEstoque(codigo, dto.status);
            return success(200, new BasicResponseDto("Usuário atualizado com sucesso!", estoque));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("livro_isbn/{livro_isbn}")
    async resumoPorISBN(
        @Path() livro_isbn: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const resumo = await this.estoqueService.getResumoEstoque(livro_isbn);
            return success(200, new BasicResponseDto("Resumo encontrado!", resumo));
        } 
        catch (error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete("codigo/{codigo}")
    async RemoverEstoque(
        @Path() codigo: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const estoque = await this.estoqueService.removerRegistroEstoque(codigo);
            return success(200, new BasicResponseDto("Estoque deletado com sucesso!", estoque));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}