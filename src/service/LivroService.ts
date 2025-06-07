import { Livro } from "../model/Livro";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroService } from "./CategoriaLivroService";

type DadosAtualizacaoLivro = {
    isbn?: string;
    titulo?: string;
    autor?: string;
    editora?: string;
    edicao?: string;
    categoriaId?: number;
}

export class LivroService{
    livroRepository: LivroRepository = LivroRepository.getInstance();
    categoriaService = new CategoriaLivroService();

    AdicionarLivro(livroData: any): Livro {
        const {isbn, titulo, autor, editora, edicao, categoriaId} = livroData;
        if (!titulo || !autor || !editora || !edicao || !isbn || !categoriaId) {
            throw new Error("Informações incompletas para cadastrar livro.");
        }
            
        const categoria = this.categoriaService.buscarPorId(categoriaId);
        if (!categoria) {
            throw new Error("Categoria inválida!");
        }

        if (this.livroRepository.buscarLivroPorISBN(isbn)) {
            throw new Error("Livro com esse ISBN já existe!");
        }
    
        const livroExistente = this.livroRepository.buscarLivroPorAutorEditoraEdicao(autor, editora, edicao);
        if(livroExistente){
            throw new Error("Já existe um livro com este autor, editora e edição!");
        }
    
        const novoLivro = new Livro(isbn, titulo, autor, editora, edicao, categoriaId);
        this.livroRepository.inserirLivro(novoLivro);
        return novoLivro;
    }

    listarLivroComFiltro(filtros: any): Livro[]{
        const {isbn, titulo, autor, categoriaId} = filtros;
        const livros = this.livroRepository.listarLivros();

        return livros.filter(livro => {
            const combinaISBN = isbn ? livro.isbn.toLowerCase().includes(isbn.toLowerCase()): true;
            const combinaTitulo = titulo ? livro.titulo.toLowerCase().includes(titulo.toLowerCase()): true;
            const combinaAutor = autor ? livro.autor.toLowerCase().includes(autor.toLowerCase()): true;
            const combinaCatId = categoriaId? livro.categoriaId === categoriaId: true;
            return combinaISBN && combinaTitulo && combinaAutor && combinaCatId;
            }
        );
    }

    buscarLivroPorISBN(isbn: string): Livro {
        const livro = this.livroRepository.buscarLivroPorISBN(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        return livro;
    }

    atualizarLivro(isbn: string, novosDados: DadosAtualizacaoLivro): Livro{
        const livro = this.livroRepository.buscarLivroPorISBN(isbn);
        if(!livro){
            throw new Error("Livro não encontrado!");
        }
    
        if(!novosDados.titulo && !novosDados.autor && !novosDados.editora && !novosDados.edicao && !novosDados.categoriaId){
            throw new Error("Nenhum dado informado para atualização.");
        }

        if(novosDados.isbn && novosDados.isbn !== isbn){
            throw new Error("Não é permitido alterar o ISBN do livro.");
        }
    
        if(novosDados.categoriaId){
            const categoria = this.categoriaService.buscarPorId(novosDados.categoriaId);
            if(!categoria){
                throw new Error("Categoria Inválida!");
            }
        }
            
        const livroAtualizado = this.livroRepository.atualizarDadosLivro(isbn, novosDados);
        if(!livroAtualizado){
            throw new Error("Erro inesperado ao atualizar livro!");
        }
        return livroAtualizado;
    }

    //remover livro após implementação de estoque e empréstimo
}
