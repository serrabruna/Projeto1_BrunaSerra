"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const Emprestimo_1 = require("../model/Emprestimo");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EmprestimoService {
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    catUsuRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    registrarEmprestimo(cpfUsuario, codigoExemplar) {
        const usuario = this.usuarioRepository.buscarUsuarioPorCPF(cpfUsuario);
        if (!usuario) {
            throw new Error("Usuário não encontrado!");
        }
        if (usuario.status !== "ativo" && usuario.status !== "suspenso") {
            throw new Error("Usuário inativo.");
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
        const emprestimosAtivos = this.emprestimoRepository.emprestimosAbertos(cpfUsuario);
        const limiteQtd = categoria.nome === "Professor" ? 5 : 3;
        const limiteDias = categoria.nome === "Aluno" && livro &&
            livro.categoriaId === usuario.cursoId ? 30 : categoria.nome === "Aluno" ? 15 : 40;
        if (emprestimosAtivos.length >= limiteQtd) {
            throw new Error("Usuário atingiu o limite de empréstimos!");
        }
        const dataEmprestimo = new Date();
        const dataDevolucao = new Date();
        dataDevolucao.setDate(dataEmprestimo.getDate() + limiteDias);
        const novoEmprestimo = new Emprestimo_1.Emprestimo(cpfUsuario, codigoExemplar);
        novoEmprestimo.dataEmprestimo = dataEmprestimo;
        novoEmprestimo.dataDevolucao = dataDevolucao;
        exemplar.status = "emprestado";
        this.emprestimoRepository.inserir(novoEmprestimo);
        return novoEmprestimo;
    }
    listarEmprestimos() {
        return this.emprestimoRepository.listarEmprestimos();
    }
    registrarDevolução(id) {
        const emprestimo = this.emprestimoRepository.buscarEmprestimoPorId(id);
        if (!emprestimo || !emprestimo.dataEntrega) {
            throw new Error("Empréstimo não encontrado ou já devolvido.");
        }
        const dataEntrega = new Date();
        emprestimo.dataEntrega = dataEntrega;
        let atraso = 0;
        if (dataEntrega > emprestimo.dataDevolucao) {
            const diferencaMs = dataEntrega.getTime() - emprestimo.dataDevolucao.getTime();
            atraso = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));
        }
        else {
            atraso = 0;
        }
        emprestimo.diasAtraso = atraso;
        if (atraso > 0) {
            this.usuarioService.aplicarSuspensao(emprestimo.cpfUsuario, atraso);
        }
        const exemplar = this.estoqueRepository.buscarPorCodigo(emprestimo.codigoExemplar);
        if (exemplar) {
            exemplar.status = "disponivel";
        }
        return emprestimo;
    }
}
exports.EmprestimoService = EmprestimoService;
