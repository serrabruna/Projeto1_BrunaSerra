import { UsuarioService } from "../service/UsuarioService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioDto } from "../model/dto/UsuarioDto";
import { Usuario } from "../model/entity/Usuario";
import { UsuarioRequestDto } from "../model/dto/UsuarioRequestDto";

@Route("usuario")
@Tags("Usuario")
export class UsuarioController{
    private usuarioService = new UsuarioService();

    @Post()
    async criarUsuario(
        @Body() dto: UsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise <void>{
        try{
            const usuario = await this.usuarioService.cadastrarUsuario(dto);
            return success(201, new BasicResponseDto("Usuário cadastrado com sucesso!", usuario));
        }catch(error: any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarUsuario(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const usuarios: Usuario[] = await this.usuarioService.listarUsuarios();
            return success(200, new BasicResponseDto("Usuarios listados com sucesso!", usuarios));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("cpf/{cpf}")
    async buscarUsuario(
        @Path() cpf: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const usuario = await this.usuarioService.buscarUsuario(cpf);
            return success(200, new BasicResponseDto("Usuário encontrado!", usuario));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put("cpf/{cpf}")
    async atualizarUsuario(
        @Path() cpf: string,
        @Body() dto: UsuarioRequestDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const usuario = await this.usuarioService.atualizarUsuario(cpf, dto);
            const responseDto = new UsuarioDto(
                usuario.id!,
                usuario.cpf,
                usuario.nome,
                usuario.email,
                usuario.categoriaId,
                usuario.cursoId!,
                usuario.status,
                usuario.diaSuspensao,
                usuario.suspensaoAte
            );
            return success(200, new BasicResponseDto("Usuário atualizado com sucesso!", responseDto));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete("cpf/{cpf}")
    async removerUsuario(
        @Path() cpf: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void>{
        try{
            const usuario = await this.usuarioService.removerUsuario(cpf);
            return success(200, new BasicResponseDto("Usuário deletado com sucesso!", usuario));
        }
        catch(error: any){
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}



