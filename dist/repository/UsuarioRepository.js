"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const Usuario_1 = require("../model/entity/Usuario");
const mysql_1 = require("../database/mysql");
class UsuarioRepository {
    static instance;
    usuarios = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    imprimeResult(err, result) {
        if (result != undefined) {
            console.log("Dentro callback", result);
        }
    }
    async createTable() {
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.Usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            cpf VARCHAR(11) NOT NULL UNIQUE,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            categoriaId INT NOT NULL,
            cursoId INT NOT NULL,
            status VARCHAR(10) DEFAULT 'ativo',
            diaSuspensao INT DEFAULT 0,
            suspensaoAte DATE
            )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log("Tabela Usuario criada com sucesso:", resultado);
        }
        catch (err) {
            console.error("Erro ao executar a query:", err);
        }
    }
    async insertUsuario(cpf, nome, email, categoriaId, cursoId) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.Usuario (cpf, nome, email, categoriaId, cursoId, status, diaSuspensao) VALUES (?, ?, ?, ?, ?, 'ativo', 0)", [cpf, nome, email, categoriaId, cursoId]);
        const newUsuario = new Usuario_1.Usuario(cpf, nome, email, categoriaId, cursoId);
        newUsuario.id = resultado.insertId;
        +console.log("Usuario inserido com sucesso:", newUsuario);
        return newUsuario;
    }
    async buscarUsuarioPorCPF(cpf) {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Usuario WHERE cpf = ?", [cpf]);
        if (resultado.length > 0) {
            const row = resultado[0];
            const usuario = new Usuario_1.Usuario(row.cpf, row.nome, row.email, row.categoriaId, row.cursoId);
            usuario.id = row.id;
            usuario.status = row.status;
            usuario.diaSuspensao = row.diaSuspensao;
            usuario.suspensaoAte = row.suspensaoAte;
            return usuario;
        }
        return null;
    }
    async listarUsuarios() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Usuario", []);
        return resultado.map((row) => {
            const usuario = new Usuario_1.Usuario(row.cpf, row.nome, row.email, row.categoriaId, row.cursoId);
            usuario.id = row.id;
            usuario.status = row.status;
            usuario.diaSuspensao = row.diaSuspensao;
            usuario.suspensaoAte = row.suspensaoAte;
            return usuario;
        });
    }
    async atualizarDadosUsuario(usuario) {
        const query = `
        UPDATE biblioteca.Usuario
        SET nome = ?, email = ?, categoriaId = ?, cursoId = ?, status = ?, diaSuspensao = ?, suspensaoAte = ?
        WHERE cpf = ?`;
        const resultado = await (0, mysql_1.executarComandoSQL)(query, [
            usuario.nome,
            usuario.email,
            usuario.categoriaId,
            usuario.cursoId,
            usuario.status,
            usuario.diaSuspensao,
            usuario.suspensaoAte,
            usuario.cpf,
        ]);
        if (resultado.affectedRows > 0) {
            return this.buscarUsuarioPorCPF(usuario.cpf);
        }
        return null;
    }
    async removerUsuario(cpf) {
        const resultado = await (0, mysql_1.executarComandoSQL)("DELETE FROM biblioteca.Usuario WHERE cpf = ?", [cpf]);
        return resultado.affectedRows > 0;
    }
}
exports.UsuarioRepository = UsuarioRepository;
