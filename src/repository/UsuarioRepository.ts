import {Usuario} from "../model/Usuario"

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
}