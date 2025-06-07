import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioService } from "./CategoriaUsuarioService";
import { CursoService } from "./CursoService";

type DadosAtualizacaoUsuario = {
    cpf?: string;
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
        if(!cpf || !nome || !email || !categoriaId){
            throw new Error("Informações incompletas");
        }
        if(!Usuario.validarCPF(cpf)){
            throw new Error("CPF Inválido!");
        }
        if(this.usuarioRepository.buscarUsuarioPorCPF(cpf)){
            throw new Error("CPF já cadastrado!");
        }
        
        const categoria = this.categoriaService.buscarPorId(categoriaId);
        if (!categoria) {
            throw new Error("Categoria inválida!");
        }
        if (categoriaId !== 3) {
            if (cursoId === undefined) {
                throw new Error("Curso é obrigatório para alunos e professores.");
            }
            const curso = this.cursoService.buscarPorId(cursoId);
            if (!curso) {
                throw new Error("Curso inválido!");
            }
        }

        const cursoFinal = categoriaId === 3 ? 0 : cursoId;

        const novoUsuario = new Usuario(cpf, nome, email, categoriaId, cursoFinal);
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

    atualizarUsuario(cpf: string, novosDados: DadosAtualizacaoUsuario): Usuario{
        const usuario = this.usuarioRepository.buscarUsuarioPorCPF(cpf);
        if(!usuario){
            throw new Error("Usuário não encontrado!");
        }

        if (!novosDados.nome && !novosDados.email && !novosDados.categoriaId && !novosDados.cursoId) {
            throw new Error("Nenhum dado informado para atualização.");
        }

        if(novosDados.cpf && novosDados.cpf !== cpf){
            throw new Error("Não é permitido alterar o CPF!");
        }

        if(novosDados.categoriaId){
            const categoria = this.categoriaService.buscarPorId(novosDados.categoriaId);
            if(!categoria){
                throw new Error("Categoria Inválida!");
            }
        }

        if(novosDados.cursoId){
            const curso = this.cursoService.buscarPorId(novosDados.cursoId);
            if(!curso){
                throw new Error("Curso Inválido!");
            }
        }
        
        const usuarioAtualizado = this.usuarioRepository.atualizarDadosUsuario(cpf, novosDados);
        if(!usuarioAtualizado){
            throw new Error("Erro inesperado ao atualizar usuário!");
        }
        return usuarioAtualizado;
    }

    /*remover usuário = implementar após a implementação de empréstimo*/
}
