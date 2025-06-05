import {Usuario} from "../model/Usuario"

type DadosAtualizacaoUsuario = {
    nome?: string;
    email?: string;
    categoria?: string;
    curso?: string;
    status?: 'ativo' | 'inativo' | 'suspenso';
    diaSuspensao?: number;
}

export class UsuarioRepository{
    private static instance: UsuarioRepository;
    private usuarios: Usuario[] = [];

    private constructor(){}

    public static getInstance(): UsuarioRepository{
        if(!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    InserirUsuario(usuario: Usuario){
        this.usuarios.push(usuario);
    }

    buscarUsuarioPorCPF(cpf:string): Usuario | undefined{
        return this.usuarios.find(usuario => usuario.cpf === cpf);
    }

    listarUsuarios(): Usuario[]{
        return this.usuarios;
    }

    atualizarDadosUsuario(cpf: string, novosDados: DadosAtualizacaoUsuario): Usuario | undefined{
        const usuario = this.buscarUsuarioPorCPF(cpf);
        if(!usuario) return undefined;

        if(novosDados.nome){
            usuario.nome = novosDados.nome;
        }
        if(novosDados.email){
            usuario.email = novosDados.email;
        }
        if(novosDados.categoria){
            usuario.categoria = novosDados.categoria;
        }
        if(novosDados.curso){
            usuario.curso = novosDados.curso;
        }
        if(novosDados.status){
            usuario.status = novosDados.status;
        }
        if(novosDados.diaSuspensao !== undefined){
            usuario.diaSuspensao = novosDados.diaSuspensao;
        }
        return usuario;
    }

    removerUsuario(cpf: string): boolean{
        const index = this.usuarios.findIndex(u => u.cpf == cpf);
        if(index == -1){
            return false;
        }
        this.usuarios.slice(index, 1);
        return true;
    }
}