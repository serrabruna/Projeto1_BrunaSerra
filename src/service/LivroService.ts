import { Livro } from "../model/entity/Livro";
import { LivroRepository } from "../repository/LivroRepository";
import { CategoriaLivroService } from "./CategoriaLivroService";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueService } from "./EstoqueService";

type DadosAtualizacaoLivro = {
  isbn?: string;
  titulo?: string;
  autor?: string;
  editora?: string;
  edicao?: string;
  categoriaId?: number;
};

export class LivroService {
  livroRepository: LivroRepository = LivroRepository.getInstance();
  categoriaService: CategoriaLivroService = new CategoriaLivroService();
  estoqueService: EstoqueService = new EstoqueService(); 
  estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();
  emprestimoRepository: EmprestimoRepository = EmprestimoRepository.getInstance();

  async AdicionarLivro(livroData: any): Promise<Livro>{
    const { isbn, titulo, autor, editora, edicao, categoriaId } = livroData;
    if (!titulo || !autor || !editora || !edicao || !isbn || !categoriaId) {
      throw new Error("Informações incompletas para cadastrar livro.");
    }

    const categoria = await this.categoriaService.buscarPorId(categoriaId);
    if (!categoria) {
      throw new Error("Categoria inválida!");
    }

    const livroPorISBN = await this.livroRepository.buscarLivroPorISBN(isbn);
    if (livroPorISBN) {
      throw new Error("Livro com esse ISBN já existe!");
    }

    const livrosExistentesPorDetalhes = await this.livroRepository.buscarLivroPorAutorEditoraEdicao(
      autor,
      editora,
      edicao
    );
    if (livrosExistentesPorDetalhes && livrosExistentesPorDetalhes.length > 0) {
      throw new Error("Já existe um livro com este autor, editora e edição!");
    }

    const novoLivro = await this.livroRepository.insertLivro(
      isbn,
      titulo,
      autor,
      editora,
      edicao,
      categoriaId
    );
    return novoLivro;
  }

  async listarLivroComFiltro(filtros: any): Promise<Livro[]> {
    const { isbn, titulo, autor, categoriaId } = filtros;
    const livros = await this.livroRepository.listarLivros();

    return livros.filter((livro) => {
      const combinaISBN = isbn ? livro.isbn.toLowerCase().includes(isbn.toLowerCase()) : true;
      const combinaTitulo = titulo ? livro.titulo.toLowerCase().includes(titulo.toLowerCase()) : true;
      const combinaAutor = autor ? livro.autor.toLowerCase().includes(autor.toLowerCase()) : true;
      const combinaCatId = categoriaId ? livro.categoriaId === categoriaId : true;
      return combinaISBN && combinaTitulo && combinaAutor && combinaCatId;
    });
  }

  async buscarLivroPorISBN(isbn: string): Promise<Livro> {
    const livro = await this.livroRepository.buscarLivroPorISBN(isbn);
    if (!livro) {
      throw new Error("Livro não encontrado.");
    }
    return livro;
  }

  async atualizarLivro(isbn: string, novosDados: DadosAtualizacaoLivro): Promise<Livro> {
    const livro = await this.livroRepository.buscarLivroPorISBN(isbn);
    if (!livro) {
      throw new Error("Livro não encontrado!");
    }

    if (
      !novosDados.titulo &&
      !novosDados.autor &&
      !novosDados.editora &&
      !novosDados.edicao &&
      !novosDados.categoriaId
    ) {
      throw new Error("Nenhum dado informado para atualização.");
    }

    if (novosDados.isbn && novosDados.isbn !== isbn) {
      throw new Error("Não é permitido alterar o ISBN do livro.");
    }

    if (novosDados.categoriaId) {
      const categoria = await this.categoriaService.buscarPorId(
        novosDados.categoriaId
      );
      if (!categoria) {
        throw new Error("Categoria Inválida!");
      }
    }

    const livroComNovosDados = new Livro(
        livro.isbn,
        novosDados.titulo ?? livro.titulo,
        novosDados.autor ?? livro.autor,
        novosDados.editora ?? livro.editora,
        novosDados.edicao ?? livro.edicao,
        novosDados.categoriaId ?? livro.categoriaId,
        livro.id
    );

    const livroAtualizado = await this.livroRepository.atualizarDadosLivro(livroComNovosDados);
    
    if (!livroAtualizado) {
      throw new Error("Erro inesperado ao atualizar livro!");
    }
    return livroAtualizado;
  }

  async removerLivro(isbn: string): Promise<void> {
    const livro = await this.livroRepository.buscarLivroPorISBN(isbn);
    if (!livro) {
      throw new Error("Livro não encontrado.");
    }

    const exemplares = await this.estoqueRepository.listarEstoque().filter((e) => e.livro_isbn === isbn);
    if (exemplares.length > 0) {
      throw new Error("Não é possível remover o livro: existem exemplares vinculados no estoque.");
    }

    const emprestimos = await this.emprestimoRepository.listarEmprestimos();
    const emprestimosAtivos = emprestimos.filter((e) => {
      const exemplar = this.estoqueRepository.buscarPorCodigo(e.codigoExemplar);
      return exemplar && exemplar.livro_isbn === isbn && !e.dataEntrega;
    });

    if (emprestimosAtivos.length > 0) {
      throw new Error(
        "Não é possível remover o livro: existem empréstimos ativos."
      );
    }
    if (await this.estoqueService.existeExemplarDoLivro(isbn)) {
      throw new Error("Não é possível remover o livro: existem exemplares vinculados.");
    }

    const removido = await this.livroRepository.removerLivro(isbn);
    if (!removido) {
        throw new Error("Erro inesperado ao remover livro!");
    }
  }
}
