import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
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