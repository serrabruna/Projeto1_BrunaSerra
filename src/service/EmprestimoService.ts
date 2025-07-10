import { Emprestimo } from "../model/entity/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioService } from "./UsuarioService";
import { EstoqueService } from "./EstoqueService";
import { calculaDiferencaDiasEntreDatas } from "../util/DataUtil";

export class EmprestimoService {
  emprestimoRepository: EmprestimoRepository = EmprestimoRepository.getInstance();
  usuarioRepository: UsuarioRepository = UsuarioRepository.getInstance();
  estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();
  catUsuRepository: CategoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
  livroRepository: LivroRepository = LivroRepository.getInstance();
  usuarioService: UsuarioService = new UsuarioService();
  estoqueService: EstoqueService = new EstoqueService();
  

  async registrarEmprestimo(cpfUsuario: string, codigoExemplar: number): Promise<Emprestimo> {
    try {
      let usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpfUsuario);
      if (!usuario) {
        throw new Error("Usuário não encontrado!");
      }

      await this.usuarioService.verificarInativacaoUsuario(cpfUsuario);
      const usuarioAtualizado = await this.usuarioRepository.buscarUsuarioPorCPF(cpfUsuario);
      
      if (!usuarioAtualizado || usuarioAtualizado.status !== "ativo") {
        throw new Error("Usuário não está apto para empréstimo (inativo ou suspenso).");
      }
      if (usuarioAtualizado.diaSuspensao && usuarioAtualizado.diaSuspensao > 0) {
        throw new Error("Usuário suspenso.");
      }

      const exemplar = await this.estoqueRepository.buscarPorCodigo(codigoExemplar);
      if (!exemplar || exemplar.status !== "disponivel") {
        throw new Error("Exemplar não disponível para empréstimo.");
      }

      const categoria = await this.catUsuRepository.buscarPorId(usuarioAtualizado.categoriaId);
      if (!categoria) {
        throw new Error("Categoria do usuário inválida.");
      }

      const livro = await this.livroRepository.buscarLivroPorISBN(exemplar.livro_isbn);
      if (!livro) {
        throw new Error("Livro associado ao exemplar não encontrado.");
      }

      const emprestimosAtivos = await this.emprestimoRepository.listarPorUsuario(usuarioAtualizado.cpf!);
      const limiteQtd = categoria.nome === "Professor" ? 5 : 3;

      if (emprestimosAtivos.length >= limiteQtd) {
        throw new Error("Usuário atingiu o limite de empréstimos!");
      }

      const limiteDias =
        categoria.nome === "Aluno" && livro && livro.categoriaId 
        === usuarioAtualizado.cursoId ? 30 : categoria.nome === "Aluno" ? 15 : 40;

      const dataEmprestimo = new Date();
      const dataDevolucaoPrevista = new Date();
      dataDevolucaoPrevista.setDate(dataEmprestimo.getDate() + limiteDias);

      const novoEmprestimo = new Emprestimo(
        usuarioAtualizado.cpf, 
        usuarioAtualizado.id!,
        codigoExemplar,
        dataEmprestimo,
        dataDevolucaoPrevista
      );

      await this.estoqueService.marcarComoEmprestado(codigoExemplar);
      const emprestimoRegistrado = await this.emprestimoRepository.insertEmprestimo(novoEmprestimo);
      return emprestimoRegistrado;
    } catch (error) {
      console.error("Erro ao registrar empréstimo:", error);
      throw error;
    }
  }

  async listarEmprestimos(): Promise<Emprestimo[]> { 
    try {
        return await this.emprestimoRepository.listarEmprestimos();
    } catch (error) {
        console.error("Erro ao listar empréstimos:", error);
        throw error;
    }
  }

  async registrarDevolucao(id: number): Promise<Emprestimo> {
    try {
      const emprestimo = await this.emprestimoRepository.buscarEmprestimoPorId(id);
      if (!emprestimo || emprestimo.dataEntrega) {
        throw new Error("Empréstimo não encontrado ou já devolvido.");
      }

      const dataEntrega = new Date();
      emprestimo.dataEntrega = dataEntrega;

      let atraso: number = 0;
      const dataDevolucaoPrevistaObj = emprestimo.dataDevolucaoPrevista;
      
      if (dataEntrega > dataDevolucaoPrevistaObj) {
        atraso = calculaDiferencaDiasEntreDatas(dataDevolucaoPrevistaObj, dataEntrega);
      }
      
      emprestimo.diasAtraso = atraso;

      if (atraso > 0) {
        const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(emprestimo.cpfUsuario);
        if (usuario && usuario.cpf) {
          await this.usuarioService.aplicarSuspensao(usuario.cpf, atraso);
        } else {
          console.warn("Usuário associado ao empréstimo não encontrado para aplicar suspensão.");
        }
      }

      await this.estoqueService.marcarComoDisponivel(emprestimo.codigoExemplar);

      const emprestimoAtualizado = await this.emprestimoRepository.atualizarEmprestimo(emprestimo);

      if (!emprestimoAtualizado) {
        throw new Error("Erro inesperado ao registrar devolução: empréstimo não pôde ser atualizado no BD.");
      }
      return emprestimoAtualizado;
    } catch (error) {
      console.error("Erro ao registrar devolução:", error);
      throw error;
    }
  }
}
