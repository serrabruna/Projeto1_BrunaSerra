"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivro_1 = require("../model/entity/CategoriaLivro");
const mysql_1 = require("../database/mysql");
class CategoriaLivroRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository;
        }
        return this.instance;
    }
    async createTable() {
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro (
            id INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL UNIQUE
            )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela CategoriaLivro criada com sucesso:", resultado);
        }
        catch (err) {
            console.error("Erro ao executar a query:", err);
        }
    }
    async insertCategoriaLivro(nome) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.CategoriaLivro (nome) VALUES (?)", [nome]);
        const newCategoriaLivro = new CategoriaLivro_1.CategoriaLivro(nome);
        newCategoriaLivro.id = resultado.insertId;
        +console.log("Categoria de livro inserida com sucesso:", newCategoriaLivro);
        return newCategoriaLivro;
    }
    async listarCategorias() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaLivro", []);
        return resultado.map((row) => new CategoriaLivro_1.CategoriaLivro(row.id, row.nome));
    }
    async buscarPorId(id) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaLivro WHERE id = ?", [id]);
        if (resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaLivro_1.CategoriaLivro(row.id, row.nome);
        }
        return undefined;
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
