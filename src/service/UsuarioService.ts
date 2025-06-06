import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuario } from "../model/CategoriaUsuario";
import { Curso } from "../model/Curso";

export class UsuarioService{
    usuarioRepository: UsuarioRepository = UsuarioRepository.getInstance();

    cadastrarUsuario(usuarioData: any): Usuario {
        const {cpf, nome, email, categoria, curso} = usuarioData;
        if(!cpf || nome || email || categoria || curso){
            throw new Error("Informações incompletas");
        }
        const novoUsuario = new Usuario(cpf, nome, email, categoria, curso);
        this.usuarioRepository.InserirUsuario(novoUsuario);
        return novoUsuario;
    }

    
    
}