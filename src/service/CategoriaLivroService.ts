import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { CategoriaLivro } from "../model/entity/CategoriaLivro";

export class CategoriaLivroService{
    categoriaLivroRepository = CategoriaLivroRepository.getInstance();

    async listarCategorias(): Promise<CategoriaLivro[]>{
        return await this.categoriaLivroRepository.listarCategorias();
    }

    async buscarPorId(id: number): Promise<CategoriaLivro | undefined>{
        return await this.categoriaLivroRepository.buscarPorId(id);
    }
    
}