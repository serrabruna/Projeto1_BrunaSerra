import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { CategoriaLivro } from "../model/entity/CategoriaLivro";
import { LivroRepository } from "../repository/LivroRepository";

export class CategoriaLivroService{
    livroRepository = LivroRepository.getInstance();
    categoriaLivroRepository = CategoriaLivroRepository.getInstance();

    async listarCategorias(): Promise<CategoriaLivro[]>{
        try{
            return await this.categoriaLivroRepository.listarCategorias();
        }catch(error){
            console.error("Erro ao listar categorias no repositório");
            throw error;
        }
    }

    async buscarPorId(id: number): Promise<CategoriaLivro | undefined>{
        try{
            return await this.categoriaLivroRepository.buscarPorId(id);
        }catch(error){
            console.error("Erro ao buscar categoria por ID no repositório");
            throw error;
        }
    }

    async cadastrarCategoria(nome: string): Promise<CategoriaLivro> {
        if (typeof nome !== 'string' || nome.trim() === '') {
            throw new Error("O nome da categoria é obrigatório e deve ser uma string não vazia.");
        }
            
        try {
            const todasCategorias = await this.categoriaLivroRepository.listarCategorias();
            const categoriaExistente = todasCategorias.find(cat => cat.nome.toLowerCase() === nome.toLowerCase());
            if (categoriaExistente) {
                throw new Error(`A categoria já existe.`);
            }
            const novaCategoria = await this.categoriaLivroRepository.insertCategoriaLivro(nome);
            return novaCategoria;
        } catch (error) {
            console.error("Erro ao cadastrar categoria no serviço: ", error);
            throw error;
        }
    }
    
    async deletarCategoria(id: number): Promise<boolean> {
        try {
            const categoria = await this.categoriaLivroRepository.buscarPorId(id);
            if (!categoria) {
                throw new Error("Categoria de livro não encontrada para exclusão.");
            }
    
            const livrosVinculados = await this.livroRepository.listarLivros(); 
            const temLivrosVinculados = livrosVinculados.some(user => user.categoriaId === id);
    
                if (temLivrosVinculados) {
                    throw new Error("Não é possível deletar a categoria: existem livros vinculados a ela.");
                }
    
                const deletada = await this.categoriaLivroRepository.deletarCategoria(id);
                
                if (!deletada) { 
                    throw new Error("Erro inesperado ao deletar a categoria de livro.");
                }
                return deletada;
    
            } catch (error) {
                console.error("Erro ao deletar categoria de livro no serviço: ", error);
                throw error;
            }
    }
    
}