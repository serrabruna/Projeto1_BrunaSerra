"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
const Estoque_1 = require("../model/entity/Estoque");
const mysql_1 = require("../database/mysql");
class EstoqueRepository {
    static instance;
    constructor() {
        this.createTable();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    async createTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS biblioteca.Estoque (
                codigo INT AUTO_INCREMENT PRIMARY KEY,
                livro_isbn VARCHAR(13) NOT NULL UNIQUE,
                quantidade INT NOT NULL,
                quantidade_emprestada INT DEFAULT 0,
                status ENUM('disponivel', 'emprestado') DEFAULT 'disponivel',
                FOREIGN KEY (livro_isbn) REFERENCES biblioteca.Livro(isbn)
            )`;
        try {
            await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela Estoque criada com sucesso (modelo de resumo por ISBN).");
        }
        catch (err) {
            console.error("Erro ao criar a tabela Estoque:", err);
            throw err;
        }
    }
    async insertExemplar(livro_isbn, quantidade, quantidade_emprestada = 0) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Estoque (livro_isbn, quantidade, quantidade_emprestada, status) VALUES (?, ?, ?, ?)", [livro_isbn, quantidade, quantidade_emprestada, (quantidade > quantidade_emprestada) ? 'disponivel' : (quantidade_emprestada > 0 ? 'emprestado' : 'disponivel')]);
            const newExemplar = new Estoque_1.Estoque(livro_isbn, quantidade, quantidade_emprestada, resultado.insertId);
            console.log("Registro de Estoque inserido com sucesso:", newExemplar);
            return newExemplar;
        }
        catch (err) {
            console.error("Erro ao inserir registro de estoque:", err);
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
                return this.buscarPorCodigo(estoque.codigo);
            }
            return undefined;
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
