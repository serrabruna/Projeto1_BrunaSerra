import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaLivroRequestDto } from "../model/dto/CategoriaLivroRequestDto";

@Route("categorias-livro")
@Tags("categoria-livro")
export class CategoriaLivroController{
    private categoriaLivroService = new CategoriaLivroService();

    @Post()
    async criarCategoriaLivro(
        @Body() dto: CategoriaLivroRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise <void>{
        try{
            const catLivro = await this.categoriaLivroService.cadastrarCategoria(dto.nome);
            return success(201, new BasicResponseDto("Categoria de livro cadastrada com sucesso!", catLivro));
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
            const categoria = await this.categoriaLivroService.listarCategorias();
            return success(200, new BasicResponseDto("Categorias de livro listadas com sucesso!", categoria));
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
            const categoria = await this.categoriaLivroService.deletarCategoria(id);
            return success(200, new BasicResponseDto("Categoria de usuário deletada com sucesso!", categoria));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
