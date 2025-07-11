"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const Curso_1 = require("../model/entity/Curso");
const mysql_1 = require("../database/mysql");
class CursoRepository {
    static instance;
    constructor() {
        this.createTable();
    }
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
            console.error("Erro ao criar tabela Curso:", err);
        }
    }
    async insertCurso(nome) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Curso (nome) VALUES (?)", [nome]);
            const newCurso = new Curso_1.Curso(nome, resultado.insertId);
            +console.log("Curso inserido com sucesso:", newCurso);
            return newCurso;
        }
        catch (err) {
            console.log("Erro ao inserir curso no repositório: ", err);
            throw err;
        }
    }
    async listarCursos() {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Curso", []);
            return resultado.map((row) => {
                const curso = new Curso_1.Curso(row.nome, row.id);
                return curso;
            });
        }
        catch (err) {
            console.error("Erro ao listar cursos no repositório: ", err);
            throw err;
        }
    }
    async buscarPorId(id) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Curso WHERE id = ?", [id]);
            if (resultado.length > 0) {
                const row = resultado[0];
                return new Curso_1.Curso(row.nome, row.id);
            }
            return undefined;
        }
        catch (err) {
            console.error("Erro ao buscar curso no repositório: ", err);
            throw err;
        }
    }
    async deletarCurso(id) {
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)("DELETE FROM biblioteca.Curso WHERE id = ?", [id]);
            return resultado.affectedRows > 0;
        }
        catch (err) {
            console.error("Erro ao deletar curso no repositório:", err);
            throw err;
        }
    }
}
exports.CursoRepository = CursoRepository;
