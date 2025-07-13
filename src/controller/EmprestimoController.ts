import { EmprestimoService } from "../service/EmprestimoService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { Emprestimo } from "../model/entity/Emprestimo";
import { EmprestimoDto } from "../model/dto/EmprestimoDto";
import { EmprestimoRequestDto } from "../model/dto/EmprestimoRequestDto";

@Route("emprestimos")
@Tags("emprestimo")
export class EmprestimoController{
    private emprestimoService = new EmprestimoService;

    @Post()
    async criarEmprestimo(
        @Body() dto: EmprestimoRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void>{
        try{
            const emprestimo = await this.emprestimoService.registrarEmprestimo(dto.cpfUsuario, dto.codigoExemplar);
            return success(201, new BasicResponseDto("Empréstimo feito com sucesso!", emprestimo));
        }catch(error: any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarEmprestimos(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const emprestimo = await this.emprestimoService.listarEmprestimos();
            return success(200, new BasicResponseDto("Empréstimos listados com sucesso!", emprestimo));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put("id/{id}/devolucao")
    async registrarDevolucao(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const emprestimo = await this.emprestimoService.registrarDevolucao(id);
            return success(200, new BasicResponseDto("Devolução registrada!", emprestimo));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}