import { LivroService } from "../service/LivroService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroDto } from "../model/dto/LivroDto";
import { LivroRequestDto } from "../model/dto/LivroRequestDto";

@Route("livros")
@Tags("livro")
export class LivroController{
    private livroService = new LivroService();

    @Post()
    async criarLivro(
        @Body() dto: LivroRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void>{
        try{
            const livro = await this.livroService.AdicionarLivro(dto);
            return success(201, new BasicResponseDto("Livro cadastrado com sucesso!", livro));
        }catch(error: any){
            return fail(400, new BasicResponseDto(error.message, undefined));            
        }
    }

    @Get() 
    async listarLivroComFiltro(
        @Query() filtros: any, 
        @Res() success: TsoaResponse<200, BasicResponseDto>,
        @Res() errorResponse: TsoaResponse<500, BasicResponseDto>
    ): Promise<void> {
        try {
            const livros = await this.livroService.listarLivroComFiltro(filtros); 
            return success(200, new BasicResponseDto("Livros listados com sucesso!", livros));
        } catch (error: any) {
            return errorResponse(500, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("isbn/{isbn}")
    async buscarLivro(
        @Path() isbn: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const livro = await this.livroService.buscarLivroPorISBN(isbn);
            return success(200, new BasicResponseDto("Livro encontrado!", livro));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put("isbn/{isbn}")
    async atualizarLivro(
        @Path() isbn: string,
        @Body() dto: LivroRequestDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const livro = await this.livroService.atualizarLivro(isbn, dto);
            const responseDto = new LivroDto(
                            livro.id!,
                            livro.isbn,
                            livro.titulo,
                            livro.autor,
                            livro.editora,
                            livro.edicao,
                            livro.categoriaId
            );
            return success(200, new BasicResponseDto("Livro atualizado com sucesso!", responseDto));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete("isbn/{isbn}")
    async removerLivro(
        @Path() isbn: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const livro = await this.livroService.removerLivro(isbn);
            return success(200, new BasicResponseDto("Livro deletado com sucesso!", livro));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}