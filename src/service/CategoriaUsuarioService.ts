import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";

export class CategoriaUsuarioService{
    categoriaUsuRepository = CategoriaUsuarioRepository.getInstance();

    listarCategorias(){
        return this.categoriaUsuRepository.listarCategorias();
    }

    buscarPorId(id: number){
        return this.categoriaUsuRepository.buscarPorId(id);
    }
}