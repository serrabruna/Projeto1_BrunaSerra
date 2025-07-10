"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const Emprestimo_1 = require("../model/entity/Emprestimo");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
const UsuarioService_1 = require("./UsuarioService");
const EstoqueService_1 = require("./EstoqueService");
const DataUtil_1 = require("../util/DataUtil");
class EmprestimoService {
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    catUsuRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    usuarioService = new UsuarioService_1.UsuarioService();
    estoqueService = new EstoqueService_1.EstoqueService();
    async registrarEmprestimo(cpfUsuario, codigoExemplar) {
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
            const emprestimosAtivos = await this.emprestimoRepository.listarPorUsuario(usuarioAtualizado.cpf);
            const limiteQtd = categoria.nome === "Professor" ? 5 : 3;
            if (emprestimosAtivos.length >= limiteQtd) {
                throw new Error("Usuário atingiu o limite de empréstimos!");
            }
            const limiteDias = categoria.nome === "Aluno" && livro && livro.categoriaId
                === usuarioAtualizado.cursoId ? 30 : categoria.nome === "Aluno" ? 15 : 40;
            const dataEmprestimo = new Date();
            const dataDevolucaoPrevista = new Date();
            dataDevolucaoPrevista.setDate(dataEmprestimo.getDate() + limiteDias);
            const novoEmprestimo = new Emprestimo_1.Emprestimo(usuarioAtualizado.cpf, usuarioAtualizado.id, codigoExemplar, dataEmprestimo, dataDevolucaoPrevista);
            await this.estoqueService.marcarComoEmprestado(codigoExemplar);
            const emprestimoRegistrado = await this.emprestimoRepository.insertEmprestimo(novoEmprestimo);
            return emprestimoRegistrado;
        }
        catch (error) {
            console.error("Erro ao registrar empréstimo:", error);
            throw error;
        }
    }
    async listarEmprestimos() {
        try {
            return await this.emprestimoRepository.listarEmprestimos();
        }
        catch (error) {
            console.error("Erro ao listar empréstimos:", error);
            throw error;
        }
    }
    async registrarDevolucao(id) {
        try {
            const emprestimo = await this.emprestimoRepository.buscarEmprestimoPorId(id);
            if (!emprestimo || emprestimo.dataEntrega) {
                throw new Error("Empréstimo não encontrado ou já devolvido.");
            }
            const dataEntrega = new Date();
            emprestimo.dataEntrega = dataEntrega;
            let atraso = 0;
            const dataDevolucaoPrevistaObj = emprestimo.dataDevolucaoPrevista;
            if (dataEntrega > dataDevolucaoPrevistaObj) {
                atraso = (0, DataUtil_1.calculaDiferencaDiasEntreDatas)(dataDevolucaoPrevistaObj, dataEntrega);
            }
            emprestimo.diasAtraso = atraso;
            if (atraso > 0) {
                const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(emprestimo.cpfUsuario);
                if (usuario && usuario.cpf) {
                    await this.usuarioService.aplicarSuspensao(usuario.cpf, atraso);
                }
                else {
                    console.warn("Usuário associado ao empréstimo não encontrado para aplicar suspensão.");
                }
            }
            await this.estoqueService.marcarComoDisponivel(emprestimo.codigoExemplar);
            const emprestimoAtualizado = await this.emprestimoRepository.atualizarEmprestimo(emprestimo);
            if (!emprestimoAtualizado) {
                throw new Error("Erro inesperado ao registrar devolução: empréstimo não pôde ser atualizado no BD.");
            }
            return emprestimoAtualizado;
        }
        catch (error) {
            console.error("Erro ao registrar devolução:", error);
            throw error;
        }
    }
}
exports.EmprestimoService = EmprestimoService;
