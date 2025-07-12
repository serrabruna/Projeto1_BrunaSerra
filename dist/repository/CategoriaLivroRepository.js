"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivro_1 = require("../model/entity/CategoriaLivro");
const mysql_1 = require("../database/mysql");
class CategoriaLivroRepository {
    static instance;
    constructor() {
        this.createTable();
    }
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
            );`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela CategoriaLivro criada com sucesso:", resultado);
        }
        catch (err) {
            console.error("Erro ao criar tabela CategoriaLivro:", err);
        }
    }
    async insertCategoriaLivro(nome) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.CategoriaLivro (nome) VALUES (?)", [nome]);
            const newCategoriaLivro = new CategoriaLivro_1.CategoriaLivro(nome, resultado.insertId);
            +console.log("Categoria de livro inserida com sucesso:", newCategoriaLivro);
            return newCategoriaLivro;
        }
        catch (err) {
            console.error("Erro ao inserir categoria de livro no repositório", err);
            throw err;
        }
    }
    async listarCategorias() {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaLivro", []);
            return resultado.map((row) => {
                const categoria = new CategoriaLivro_1.CategoriaLivro(row.nome, row.id);
                return categoria;
            });
        }
        catch (err) {
            console.error("Erro ao listar categorias de livros no repositório: ", err);
            throw err;
        }
    }
    async buscarPorId(id) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaLivro WHERE id = ?", [id]);
            if (resultado.length > 0) {
                const row = resultado[0];
                return new CategoriaLivro_1.CategoriaLivro(row.nome, row.id);
            }
        }
        catch (err) {
            console.error("Erro ao listar categorias de livro no repositório: ", err);
            throw err;
        }
    }
    async deletarCategoria(id) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("DELETE FROM biblioteca.CategoriaLivro WHERE id = ?", [id]);
            return resultado.affectedRows > 0;
        }
        catch (err) {
            console.error("Erro ao deletar categoria de livro no repositório:", err);
            throw err;
        }
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
