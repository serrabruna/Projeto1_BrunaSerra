"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/entity/CategoriaUsuario");
const mysql_1 = require("../database/mysql");
class CategoriaUsuarioRepository {
    static instance;
    categorias = [
        new CategoriaUsuario_1.CategoriaUsuario(1, "Professor"),
        new CategoriaUsuario_1.CategoriaUsuario(2, "Aluno"),
        new CategoriaUsuario_1.CategoriaUsuario(3, "Bibliotecário")
    ];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository;
        }
        return this.instance;
    }
    async createTable() {
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario (
            id INT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL UNIQUE
            )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela CategoriaUsuario criada com sucesso:", resultado);
        }
        catch (err) {
            console.error("Erro ao executar a query:", err);
        }
    }
    async insertCategoriaUsuario(id, nome) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.CategoriaUsuario (id, nome) VALUES (?, ?)", [id, nome]);
        const newCategoriaUsuario = new CategoriaUsuario_1.CategoriaUsuario(id, nome);
        newCategoriaUsuario.id = resultado.insertId;
        +console.log("Categoria de usuario inserida com sucesso:", newCategoriaUsuario);
        return newCategoriaUsuario;
    }
    async listarCategorias() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaUsuario", []);
        return resultado.map((row) => new CategoriaUsuario_1.CategoriaUsuario(row.id, row.nome));
    }
    async buscarPorId(id) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.CategoriaUsuario WHERE id = ?", [id]);
        if (resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaUsuario_1.CategoriaUsuario(row.id, row.nome);
        }
        return undefined;
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
