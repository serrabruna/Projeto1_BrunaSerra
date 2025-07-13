import { CursoService } from "../service/CursoService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CursoRequestDto } from "../model/dto/CursoRequestDto";

@Route("cursos")
@Tags("curso")
export class CursoController{
    private cursoService = new CursoService();

    @Post()
    async criarCurso(
        @Body() dto: CursoRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise <void>{
        try{
            const curso = await this.cursoService.cadastrarCurso(dto.nome);
            return success(201, new BasicResponseDto("Curso cadastrado com sucesso!", curso));
        }catch(error: any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarCursos(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const curso = await this.cursoService.listarCursos();
            return success(200, new BasicResponseDto("Cursos listados com sucesso!", curso));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete("id/{id}")
    async deletarCategoria(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const curso = await this.cursoService.deletarCurso(id);
            return success(200, new BasicResponseDto("Curso deletado com sucesso!", curso));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

}