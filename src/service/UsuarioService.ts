import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioService } from "./CategoriaUsuarioService";
import { CursoService } from "./CursoService";

type DadosAtualizacaoUsuario = {
    nome?: string;
    email?: string;
    categoriaId?: number;
    cursoId?: number;
}

export class UsuarioService{
    usuarioRepository: UsuarioRepository = UsuarioRepository.getInstance();
    categoriaService = new CategoriaUsuarioService();
    cursoService = new CursoService();

    cadastrarUsuario(usuarioData: any): Usuario {
        const {cpf, nome, email, categoriaId, cursoId} = usuarioData;
        if(!cpf || nome || email || categoriaId || cursoId){
            throw new Error("Informações incompletas");
        }
        if(!Usuario.validarCPF(cpf)){
            throw new Error("CPF Inválido!");
        }
        if(this.usuarioRepository.buscarUsuarioPorCPF(cpf)){
            throw new Error("CPF já cadastrado!");
        }
        
        const categoria = this.categoriaService.buscarPorId(categoriaId);
        const curso = this.cursoService.buscarPorId(cursoId);
        

        const novoUsuario = new Usuario(cpf, nome, email, categoriaId, cursoId);
        this.usuarioRepository.InserirUsuario(novoUsuario);
        return novoUsuario;
    }

    listarUsuarioComFiltro(filtros: any): Usuario[]{
        const {nome, status, categoriaId, cursoId} = filtros;
        const usuarios = this.usuarioRepository.listarUsuarios();

        return usuarios.filter(usuario => {
            const combinaNomes = nome ? usuario.nome.toLowerCase().includes(nome.toLowerCase()): true;
            const combinaStatus = status? usuario.status === status : true;
            const combinaCatId = categoriaId? usuario.categoriaId === categoriaId: true;
            const combinaCurId = cursoId? usuario.cursoId === cursoId : true;
            return combinaNomes && combinaStatus && combinaCatId && combinaCurId;
        });
    }

    buscarUsuario(cpf: string){
        if(!Usuario.validarCPF(cpf)){
            throw new Error("CPF inválido!");
        }

        const usuario = this.usuarioRepository.buscarUsuarioPorCPF(cpf);
        
        if(!usuario){
            throw new Error("Usuario não encontrado!");
        }

        return usuario;
    }
}
