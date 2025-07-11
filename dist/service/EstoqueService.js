"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const Estoque_1 = require("../model/entity/Estoque");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    async adicionarLivroAoEstoque(livro_isbn, quantidadeParaAdicionar = 1) {
        if (!livro_isbn || quantidadeParaAdicionar <= 0) {
            throw new Error("ISBN do livro e quantidade para adicionar são obrigatórios e a quantidade deve ser maior que zero.");
        }
        try {
            const livro = await this.livroRepository.buscarLivroPorISBN(livro_isbn);
            if (!livro) {
                throw new Error("Livro não encontrado para associar ao estoque.");
            }
            const estoqueExistente = await this.estoqueRepository.buscarPorISBN(livro_isbn);
            if (estoqueExistente) {
                estoqueExistente.quantidade += quantidadeParaAdicionar;
                const estoqueAtualizado = await this.estoqueRepository.atualizarDadosEstoque(estoqueExistente);
                if (!estoqueAtualizado) {
                    throw new Error("Erro ao atualizar a quantidade do estoque existente.");
                }
                return estoqueAtualizado;
            }
            else {
                const novoRegistroEstoque = new Estoque_1.Estoque(livro_isbn, quantidadeParaAdicionar, 0);
                const estoqueCriado = await this.estoqueRepository.insertExemplar(novoRegistroEstoque.livro_isbn, novoRegistroEstoque.quantidade, novoRegistroEstoque.quantidade_emprestada);
                if (!estoqueCriado) {
                    throw new Error("Erro ao criar novo registro de estoque para o livro.");
                }
                return estoqueCriado;
            }
        }
        catch (error) {
            console.error("Erro ao adicionar livro ao estoque:", error);
            throw error;
        }
    }
    async listarDisponiveis() {
        try {
            const todosEstoques = await this.estoqueRepository.listarEstoque();
            return todosEstoques.filter((e) => e.quantidade > e.quantidade_emprestada);
        }
        catch (error) {
            console.error("Erro no serviço ao listar estoques disponíveis: ", error);
            throw error;
        }
    }
    async buscarEstoquePorCodigo(codigo) {
        try {
            const estoque = await this.estoqueRepository.buscarPorCodigo(codigo);
            if (!estoque) {
                throw new Error("Registro de estoque não encontrado.");
            }
            return estoque;
        }
        catch (error) {
            console.error("Erro ao buscar registro de estoque por código: ", error);
            throw error;
        }
    }
    async atualizarStatusEstoque(codigo, status) {
        try {
            const estoque = await this.buscarEstoquePorCodigo(codigo);
            if (estoque.status === status) {
                return estoque;
            }
            estoque.status = status;
            const estoqueAtualizado = await this.estoqueRepository.atualizarDadosEstoque(estoque);
            if (!estoqueAtualizado) {
                throw new Error("Erro inesperado ao atualizar status do registro de estoque no banco de dados.");
            }
            return estoqueAtualizado;
        }
        catch (error) {
            console.error("Erro no serviço ao atualizar status do estoque: ", error);
            throw error;
        }
    }
    async marcarComoEmprestado(codigo) {
        try {
            const estoque = await this.buscarEstoquePorCodigo(codigo);
            if (estoque.quantidade_emprestada >= estoque.quantidade) {
                throw new Error("Não há exemplares disponíveis para empréstimo deste livro (estoque esgotado).");
            }
            estoque.quantidade_emprestada += 1;
            estoque.status = (estoque.quantidade_emprestada === estoque.quantidade) ? 'emprestado' : 'disponivel';
            const estoqueAtualizado = await this.estoqueRepository.atualizarDadosEstoque(estoque);
            if (!estoqueAtualizado) {
                throw new Error("Erro ao marcar unidade como emprestada.");
            }
        }
        catch (error) {
            console.error("Erro no serviço ao marcar unidade como emprestada: ", error);
            throw error;
        }
    }
    async marcarComoDisponivel(codigo) {
        try {
            const estoque = await this.buscarEstoquePorCodigo(codigo);
            if (estoque.quantidade_emprestada <= 0) {
                throw new Error("Não há exemplares emprestados deste livro para serem devolvidos.");
            }
            estoque.quantidade_emprestada -= 1;
            estoque.status = 'disponivel';
            const estoqueAtualizado = await this.estoqueRepository.atualizarDadosEstoque(estoque);
            if (!estoqueAtualizado) {
                throw new Error("Erro ao marcar unidade como disponível.");
            }
        }
        catch (error) {
            console.error("Erro no serviço ao marcar unidade como disponível: ", error);
        }
    }
    async existeEstoqueParaLivro(isbn) {
        try {
            const estoque = await this.estoqueRepository.buscarPorISBN(isbn);
            return estoque !== undefined;
        }
        catch (error) {
            console.error("Erro no serviço ao verificar existência de estoque para livro: ", error);
            throw error;
        }
    }
    async getResumoEstoque(isbn) {
        try {
            const estoque = await this.estoqueRepository.buscarPorISBN(isbn);
            if (!estoque) {
                return { total: 0, disponiveis: 0 };
            }
            return {
                total: estoque.quantidade,
                disponiveis: estoque.quantidade - estoque.quantidade_emprestada,
            };
        }
        catch (error) {
            console.error("Erro ao obter resumo do estoque no serviço: ", error);
            throw error;
        }
    }
    async removerRegistroEstoque(codigo) {
        try {
            const estoque = await this.buscarEstoquePorCodigo(codigo);
            if (estoque.quantidade > 0) {
                throw new Error("Não é possível remover o registro de estoque: existem unidades de livros vinculadas.");
            }
            const sucesso = await this.estoqueRepository.remover(estoque.codigo);
            if (!sucesso) {
                throw new Error("Erro inesperado ao remover registro de estoque.");
            }
        }
        catch (error) {
            console.error("Erro no serviço ao remover registro de estoque: ", error);
            throw error;
        }
    }
}
exports.EstoqueService = EstoqueService;
