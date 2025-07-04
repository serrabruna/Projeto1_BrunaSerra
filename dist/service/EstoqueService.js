"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    cadastrarExemplar(codigo, livro_isbn) {
        if (!codigo || !livro_isbn) {
            throw new Error("ISBN e código do livro é obrigatório!");
        }
        const livro = this.livroRepository.buscarLivroPorISBN(livro_isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        const novoExemplar = new Estoque_1.Estoque(codigo, livro_isbn, 1, 0);
        const existente = this.estoqueRepository.buscarPorCodigo(novoExemplar.codigo);
        if (existente) {
            throw new Error("Código já utilizado. Tente novamente.");
        }
        this.estoqueRepository.inserirExemplar(novoExemplar);
        return novoExemplar;
    }
    listarDisponiveis() {
        return this.estoqueRepository.listarEstoque().filter(e => e.status === "disponivel");
    }
    buscarExemplar(codigo) {
        const exemplar = this.estoqueRepository.buscarPorCodigo(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }
        return exemplar;
    }
    atualizarStatus(codigo, status) {
        const exemplar = this.buscarExemplar(codigo);
        if (exemplar.status === status) {
            return exemplar;
        }
        exemplar.status = status;
        exemplar.quantidade_emprestada = status === "emprestado" ? 1 : 0;
        return exemplar;
    }
    marcarComoEmprestado(codigo) {
        const exemplar = this.buscarExemplar(codigo);
        if (exemplar.status !== "disponivel") {
            throw new Error("Exemplar não está disponível para empréstimo.");
        }
        exemplar.status = "emprestado";
        exemplar.quantidade_emprestada = 1;
    }
    marcarComoDisponivel(codigo) {
        const exemplar = this.buscarExemplar(codigo);
        exemplar.status = "disponivel";
        exemplar.quantidade_emprestada = 0;
    }
    existeExemplarDoLivro(isbn) {
        return this.estoqueRepository.listarEstoque().some((e) => e.livro_isbn === isbn);
    }
    getResumoEstoque(isbn) {
        const exemplares = this.estoqueRepository.listarEstoque().filter((e) => e.livro_isbn === isbn);
        return {
            total: exemplares.length,
            disponiveis: exemplares.filter((e) => e.status === "disponivel").length,
        };
    }
    removerExemplar(codigo) {
        const exemplar = this.buscarExemplar(codigo);
        if (exemplar.status === "emprestado") {
            throw new Error("Não é possível remover um exemplar emprestado.");
        }
        const sucesso = this.estoqueRepository.remover(codigo);
        if (!sucesso) {
            throw new Error("Erro ao remover exemplar.");
        }
    }
}
exports.EstoqueService = EstoqueService;
