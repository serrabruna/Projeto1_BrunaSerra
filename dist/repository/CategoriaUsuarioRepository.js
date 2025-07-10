"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/entity/CategoriaUsuario");
const mysql_1 = require("../database/mysql");
class CategoriaUsuarioRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository;
        }
        return this.instance;
    }
    async createTable() {
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario (
            id INT PRIMARY KEY AUTO_INCREMENT,
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
    async insertCategoriaUsuario(nome) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.CategoriaUsuario (nome) VALUES (?)", [nome]);
        const newCategoriaUsuario = new CategoriaUsuario_1.CategoriaUsuario(nome);
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
