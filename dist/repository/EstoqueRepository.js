"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const Estoque_1 = require("../model/entity/Estoque");
const mysql_1 = require("../database/mysql");
class EstoqueRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    async createTable() {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.Estoque (
            codigo INT PRIMARY KEY,
            livro_isbn VARCHAR(13) NOT NULL,
            quantidade INT NOT NULL,
            quantidade_emprestada INT DEFAULT 0,
            status ENUM('disponivel', 'emprestado') DEFAULT 'disponivel',
            FOREIGN KEY (livro_isbn) REFERENCES biblioteca.Livro(isbn)
        )`;
        try {
            await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela Estoque criada com sucesso.");
        }
        catch (err) {
            console.error("Erro ao criar a tabela Estoque:", err);
        }
    }
    async insertExemplar(codigo, livro_isbn, quantidade, quantidade_emprestada) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Estoque (codigo, livro_isbn, quantidade, quantidade_emprestada, status) VALUES (?, ?, ?, ?, 'disponivel')", [codigo, livro_isbn, quantidade, quantidade_emprestada]);
            const newExemplar = new Estoque_1.Estoque(codigo, livro_isbn, quantidade, quantidade_emprestada);
            console.log("Exemplar inserido com sucesso:", newExemplar);
            return newExemplar;
        }
        catch (err) {
            console.error("Erro ao inserir exemplar:", err);
            throw err;
        }
    }
    async buscarPorISBN(isbn) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Estoque WHERE livro_isbn = ?", [isbn]);
            if (resultado.length > 0) {
                const row = resultado[0];
                return new Estoque_1.Estoque(row.livro_isbn, row.quantidade, row.quantidade_emprestada, row.codigo);
            }
            return undefined;
        }
        catch (err) {
            console.error("Erro ao buscar estoque por ISBN:", err);
            throw err;
        }
    }
    async buscarPorCodigo(codigo) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Estoque WHERE codigo = ?", [codigo]);
            if (resultado.length > 0) {
                const row = resultado[0];
                return new Estoque_1.Estoque(row.livro_isbn, row.quantidade, row.quantidade_emprestada, row.codigo);
            }
            return undefined;
        }
        catch (err) {
            console.error("Erro ao buscar estoque por código:", err);
            throw err;
        }
    }
    async listarEstoque() {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Estoque", []);
            return resultado.map((row) => new Estoque_1.Estoque(row.livro_isbn, row.quantidade, row.quantidade_emprestada, row.codigo));
        }
        catch (err) {
            console.error("Erro ao listar estoque:", err);
            throw err;
        }
    }
    async atualizarDadosEstoque(estoque) {
        const query = `UPDATE biblioteca.Estoque SET quantidade = ?, quantidade_emprestada = ?, status = ?
            WHERE codigo = ?`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [
                estoque.quantidade,
                estoque.quantidade_emprestada,
                estoque.status,
                estoque.codigo
            ]);
            if (resultado.affectedRows > 0) {
                // Retorna o estado atualizado do estoque do BD
                return this.buscarPorCodigo(estoque.codigo); // 'codigo!' afirma que não será undefined
            }
            return undefined; // Retorna undefined se o registro não for encontrado/afetado
        }
        catch (err) {
            console.error("Erro ao atualizar dados do estoque:", err);
            throw err;
        }
    }
    async remover(codigo) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("DELETE FROM biblioteca.Estoque WHERE codigo = ?", [codigo]);
            return resultado.affectedRows > 0;
        }
        catch (err) {
            console.error("Erro ao remover estoque:", err);
            throw err;
        }
    }
}
exports.EstoqueRepository = EstoqueRepository;
