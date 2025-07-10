"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const Curso_1 = require("../model/entity/Curso");
const mysql_1 = require("../database/mysql");
class CursoRepository {
    static instance;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository;
        }
        return this.instance;
    }
    async createTable() {
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.Curso (
            id INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL UNIQUE
            )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela Curso criada com sucesso:", resultado);
        }
        catch (err) {
            console.error("Erro ao executar a query:", err);
        }
    }
    async insertCurso(nome) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Curso (nome) VALUES (?)", [nome]);
        const newCurso = new Curso_1.Curso(nome);
        newCurso.id = resultado.insertId;
        +console.log("Curso inserido com sucesso:", newCurso);
        return newCurso;
    }
    async listarCursos() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Curso", []);
        return resultado.map((row) => new Curso_1.Curso(row.id, row.nome));
    }
    async buscarPorId(id) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Curso WHERE id = ?", [id]);
        if (resultado.length > 0) {
            const row = resultado[0];
            return new Curso_1.Curso(row.id, row.nome);
        }
        return undefined;
    }
}
exports.CursoRepository = CursoRepository;
