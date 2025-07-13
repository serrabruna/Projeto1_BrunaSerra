import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaUsuarioRequestDto } from "../model/dto/CategoriaUsuarioResquestDto";


@Route("categorias-usuario")
@Tags("categoria-usuario")
export class CategoriaUsuarioController{
    private catUsuService = new CategoriaUsuarioService();

    @Post()
    async criarCategoriaUsuario(
        @Body() dto: CategoriaUsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise <void>{
        try{
            const catUsuario = await this.catUsuService.cadastrarCategoria(dto.nome);
            return success(201, new BasicResponseDto("Categoria de usuário cadastrada com sucesso!", catUsuario));
        }catch(error: any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarCategorias(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const categoria = await this.catUsuService.listarCategorias();
            return success(200, new BasicResponseDto("Categorias de usuário listados com sucesso!", categoria));
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
            const categoria = await this.catUsuService.deletarCategoria(id);
            return success(200, new BasicResponseDto("Categoria de usuário deletada com sucesso!", categoria));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}