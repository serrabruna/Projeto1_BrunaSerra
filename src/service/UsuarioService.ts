import { Usuario } from "../model/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import {  } from "../model/CategoriaUsuario";
import { cursoValido } from "../model/Curso";

export class UsuarioService{
    usuarioRepository: UsuarioRepository = UsuarioRepository.getInstance();

    cadastrarUsuario(usuarioData: any): Usuario {
        const {cpf, nome, email, categoria, curso} = usuarioData;
        if(!cpf || nome || email || categoria || curso){
            throw new Error("Informações incompletas");
        }
        if(!Usuario.validarCPF(cpf)){
            throw new Error("CPF Inválido!");
        }
        if(this.usuarioRepository.buscarUsuarioPorCPF(cpf)){
            throw new Error("CPF já cadastrado!");
        }
        if(!categoriaUsuarioValida(categoria)){
            throw new Error("Categoria Inválida!");
        }
        if(!cursoValido(curso)){
            throw new Error("Curso Inválido");
        }
        
        const novoUsuario = new Usuario(cpf, nome, email, categoria, curso);
        this.usuarioRepository.InserirUsuario(novoUsuario);
        return novoUsuario;
    }

    


    
}