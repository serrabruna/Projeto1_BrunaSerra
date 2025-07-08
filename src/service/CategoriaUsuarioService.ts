import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";

export class CategoriaUsuarioService{
    categoriaUsuRepository = CategoriaUsuarioRepository.getInstance();

    async listarCategorias(): Promise <CategoriaUsuario[]>{
        return await this.categoriaUsuRepository.listarCategorias();
    }

    async buscarPorId(id: number): Promise <CategoriaUsuario | undefined>{
        return await this.categoriaUsuRepository.buscarPorId(id);
    }
}