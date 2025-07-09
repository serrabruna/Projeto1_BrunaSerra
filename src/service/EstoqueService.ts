import { Estoque } from "../model/entity/Estoque";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService {
  estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();
  livroRepository: LivroRepository = LivroRepository.getInstance();

  async cadastrarExemplar(codigo: number, livro_isbn: string): Promise<Estoque> {
      if (!codigo || !livro_isbn) {
          throw new Error("Código do exemplar e ISBN do livro são obrigatórios!");
      }

      const livro = await this.livroRepository.buscarLivroPorISBN(livro_isbn);
      if (!livro) {
          throw new Error("Livro não encontrado para associar ao exemplar.");
      }

      const existente = await this.estoqueRepository.buscarPorCodigo(codigo);
      if (existente) {
          throw new Error(`Código de exemplar '${codigo}' já utilizado. Tente novamente.`);
      }

        const novoRegistroExemplar = new Estoque(codigo, livro_isbn, 1, 0);
        novoRegistroExemplar.status = 'disponivel';

        const estoqueCriado = await this.estoqueRepository.insertExemplar(
            novoRegistroExemplar.codigo!, 
            novoRegistroExemplar.livro_isbn,
            novoRegistroExemplar.quantidade,
            novoRegistroExemplar.quantidade_emprestada
        );

        if (!estoqueCriado) {
            throw new Error("Erro ao criar novo exemplar no estoque.");
        }
        return estoqueCriado;
    }

  async listarDisponiveis(): Promise<Estoque[]> {
    const todosEstoques = await this.estoqueRepository.listarEstoque();
    return todosEstoques.filter((e) => e.status === "disponivel");
  }

  async buscarExemplar(codigo: number): Promise<Estoque> {
    const exemplar = await this.estoqueRepository.buscarPorCodigo(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado."); 
        }
        return exemplar;
  }

  async atualizarStatus(
    codigo: number,
    status: "disponivel" | "emprestado"
  ): Promise<Estoque> {
      const exemplar = await this.buscarExemplar(codigo);
      if (exemplar.status === status) {
          return exemplar;
      }
      exemplar.status = status;  
      exemplar.quantidade_emprestada = status === "emprestado" ? 1 : 0; 

      const exemplarAtualizado = await this.estoqueRepository.atualizarDadosEstoque(exemplar);
      if (!exemplarAtualizado) {
          throw new Error("Erro inesperado ao atualizar status do exemplar no banco de dados.");
      }
      return exemplarAtualizado;
    }

  async marcarComoEmprestado(codigo: number): Promise<void> {
    const exemplar = await this.buscarExemplar(codigo); 
    if (exemplar.status !== "disponivel") {
          throw new Error("Exemplar não está disponível para empréstimo.");
    }
    await this.atualizarStatus(codigo, "emprestado");
  }

  async marcarComoDisponivel(codigo: number): Promise<void> {
    const exemplar = await this.buscarExemplar(codigo);
    await this.atualizarStatus(codigo, "disponivel");
  }

  async existeExemplarDoLivro(isbn: string): Promise<boolean> {
    const todosEstoques = await this.estoqueRepository.listarEstoque();
    return todosEstoques.some((e) => e.livro_isbn === isbn);
  }

  async getResumoEstoque(isbn: string): Promise<{ total: number; disponiveis: number }> {
      const todosEstoques = await this.estoqueRepository.listarEstoque();
      const exemplaresDoLivro = todosEstoques.filter((e) => e.livro_isbn === isbn);

      return {
          total: exemplaresDoLivro.length,
          disponiveis: exemplaresDoLivro.filter((e) => e.status === "disponivel").length
        };
    }


  async removerExemplar(codigo: number): Promise<void> {
    const exemplar = await this.buscarExemplar(codigo);
    if (exemplar.status === "emprestado") {
        throw new Error("Não é possível remover um exemplar emprestado.");
    }
    const sucesso = await this.estoqueRepository.remover(codigo);
    if (!sucesso) {
        throw new Error("Erro ao remover exemplar.");
    }
  }
}
