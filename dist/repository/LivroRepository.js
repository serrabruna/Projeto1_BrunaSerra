"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
const Livro_1 = require("../model/entity/Livro");
const mysql_1 = require("../database/mysql");
class LivroRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    async createTable() {
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.Livro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            isbn VARCHAR(13) NOT NULL UNIQUE,
            titulo VARCHAR(255) NOT NULL,
            autor VARCHAR(255) NOT NULL,
            editora VARCHAR(255) NOT NULL,
            edicao VARCHAR(255) NOT NULL,
            categoriaId INT NOT NULL,
            FOREIGN KEY (categoriaId) REFERENCES biblioteca.CategoriaLivro(id)
            )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela Livro criada com sucesso:", resultado);
        }
        catch (err) {
            console.error("Erro ao criar tabela livro:", err);
        }
    }
    async insertLivro(isbn, titulo, autor, editora, edicao, categoriaId) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Livro (isbn, titulo, autor, editora, edicao, categoriaId) VALUES (?, ?, ?, ?, ?, ?)", [isbn, titulo, autor, editora, edicao, categoriaId]);
            const newLivro = new Livro_1.Livro(isbn, titulo, autor, editora, edicao, categoriaId, resultado.insertId);
            newLivro.id = resultado.insertId;
            +console.log("Livro inserido com sucesso:", newLivro);
            return newLivro;
        }
        catch (err) {
            console.error("Erro ao inserir livro no repositório:", err);
            throw err;
        }
    }
    async buscarLivroPorISBN(isbn) {
        const query = "SELECT * FROM biblioteca.Livro WHERE isbn = ?";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
            if (resultado.length > 0) {
                const row = resultado[0];
                const livro = new Livro_1.Livro(row.isbn, row.titulo, row.autor, row.editora, row.edicao, row.categoriaId, row.id);
                return livro;
            }
            return undefined;
        }
        catch (err) {
            console.error("Erro ao buscar livro no repositório: ", err);
            throw err;
        }
    }
    async buscarLivroPorAutorEditoraEdicao(autor, editora, edicao) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Livro WHERE LOWER(autor) = LOWER(?) AND LOWER(editora) = LOWER(?) AND edicao = ?", [autor, editora, edicao]);
            return resultado.map((row) => new Livro_1.Livro(row.isbn, row.titulo, row.autor, row.editora, row.edicao, row.categoriaId, row.id));
        }
        catch (err) {
            console.error("Erro ao buscar livro no repositório: ", err);
            throw err;
        }
    }
    async listarLivros() {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Livro", []);
            return resultado.map((row) => new Livro_1.Livro(row.isbn, row.titulo, row.autor, row.editora, row.edicao, row.categoriaId, row.id));
        }
        catch (err) {
            console.error("Erro listar livros no repositório: ", err);
            throw err;
        }
    }
    async atualizarDadosLivro(livro) {
        const query = `
            UPDATE biblioteca.Livro
            SET titulo = ?, autor = ?, editora = ?, edicao = ?, categoriaId = ?
            WHERE isbn = ?`;
        const params = [
            livro.titulo,
            livro.autor,
            livro.editora,
            livro.edicao,
            livro.categoriaId,
            livro.isbn
        ];
        console.log('Query de atualização:', query);
        console.log('Parâmetros de atualização:', params);
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, params);
            if (resultado.affectedRows > 0) {
                return await this.buscarLivroPorISBN(livro.isbn);
            }
            return undefined;
        }
        catch (err) {
            console.error("Erro ao atualizar dados do livro no repositório:", err);
            throw err;
        }
    }
    async removerLivro(isbn) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("DELETE FROM biblioteca.livro WHERE isbn = ?", [isbn]);
            return resultado.affectedRows > 0;
        }
        catch (err) {
            console.error("Erro ao remover livro no repositório:", err);
            throw err;
        }
    }
}
exports.LivroRepository = LivroRepository;
