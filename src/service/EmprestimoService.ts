import { Emprestimo } from "../model/entity/Emprestimo";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioService } from "./UsuarioService";
import { EstoqueService } from "./EstoqueService";

export class EmprestimoService {
  emprestimoRepository: EmprestimoRepository = EmprestimoRepository.getInstance();
  usuarioRepository: UsuarioRepository = UsuarioRepository.getInstance();
  estoqueRepository: EstoqueRepository = EstoqueRepository.getInstance();
  catUsuRepository: CategoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
  livroRepository: LivroRepository = LivroRepository.getInstance();
  usuarioService: UsuarioService = new UsuarioService();
  estoqueService: EstoqueService = new EstoqueService();

  registrarEmprestimo(cpfUsuario: string, codigoExemplar: number): Emprestimo {
    const usuario = this.usuarioRepository.buscarUsuarioPorCPF(cpfUsuario);
    if (!usuario) {
      throw new Error("Usuário não encontrado!");
    }
    this.usuarioService.verificarInativacaoUsuario(cpfUsuario);
    if (usuario.status !== "ativo") {
      throw new Error("Usuário não está apto para empréstimo.");
    }
    if (usuario.diaSuspensao && usuario.diaSuspensao > 0) {
      throw new Error("Usuário suspenso.");
    }

    const exemplar = this.estoqueRepository.buscarPorCodigo(codigoExemplar);
    if (!exemplar || exemplar.status !== "disponivel") {
      throw new Error("Exemplar não disponível.");
    }

    const categoria = this.catUsuRepository.buscarPorId(usuario.categoriaId);
    if (!categoria) {
      throw new Error("Categoria do usuário inválida.");
    }

    const livro = this.livroRepository.buscarLivroPorISBN(exemplar.livro_isbn);
    if (!livro) {
      throw new Error("Livro associado ao exemplar não encontrado.");
    }

    const emprestimosAtivos =
      this.emprestimoRepository.emprestimosAbertos(cpfUsuario);
    const limiteQtd = categoria.nome === "Professor" ? 5 : 3;
    const limiteDias =
      categoria.nome === "Aluno" &&
      livro &&
      livro.categoriaId === usuario.cursoId
        ? 30
        : categoria.nome === "Aluno"
        ? 15
        : 40;

    if (emprestimosAtivos.length >= limiteQtd) {
      throw new Error("Usuário atingiu o limite de empréstimos!");
    }

    const dataEmprestimo = new Date();
    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataEmprestimo.getDate() + limiteDias);

    const novoEmprestimo = new Emprestimo(cpfUsuario, codigoExemplar);
    this.estoqueService.marcarComoEmprestado(codigoExemplar);
    novoEmprestimo.dataEmprestimo = dataEmprestimo;
    novoEmprestimo.dataDevolucao = dataDevolucao;

    this.emprestimoRepository.inserir(novoEmprestimo);
    return novoEmprestimo;
  }

  listarEmprestimos(): Emprestimo[] {
    return this.emprestimoRepository.listarEmprestimos();
  }

  registrarDevolucao(id: number): Emprestimo {
    const emprestimo = this.emprestimoRepository.buscarEmprestimoPorId(id);
    if (emprestimo === undefined || emprestimo.dataEntrega) {
      throw new Error("Empréstimo não encontrado ou já devolvido.");
    }
    const dataEntrega = new Date();
    emprestimo.dataEntrega = dataEntrega;
    let atraso: number = 0;

    if (!emprestimo.dataDevolucao) {
      throw new Error("Data de devolução não está definida.");
    }

    if (dataEntrega > emprestimo.dataDevolucao) {
      const diferencaMs =
        dataEntrega.getTime() - emprestimo.dataDevolucao.getTime();
      atraso = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));
    } else {
      atraso = 0;
    }

    emprestimo.diasAtraso = atraso;

    if (atraso > 0) {
      this.usuarioService.aplicarSuspensao(emprestimo.cpfUsuario, atraso);
    }

    const exemplar = this.estoqueRepository.buscarPorCodigo(
      emprestimo.codigoExemplar
    );
    if (exemplar) {
      this.estoqueService.marcarComoDisponivel(emprestimo.codigoExemplar);
    }

    return emprestimo;
  }
}
