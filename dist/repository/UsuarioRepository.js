"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const Usuario_1 = require("../model/Usuario");
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
        const query = ` CREATE TABLE IF NOT EXISTS usuarios.Usuario (
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
            console.log('Tabela Usuario criada com sucesso:', resultado);
        }
        catch (err) {
            console.error('Erro ao executar a query:', err);
        }
    }
    async insertUsuario(cpf, nome, email, categoriaId, cursoId) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO usuarios.Usuario (cpf, nome, email, categoriaId, cursoId, status, diaSuspensao) VALUES (?, ?, ?, ?, ?, 'ativo', 0)", [cpf, nome, email, categoriaId, cursoId]);
        const newUsuario = new Usuario_1.Usuario(cpf, nome, email, categoriaId, cursoId);
        newUsuario.id = resultado.insertId;
        +console.log('Produto inserido com sucesso:', newUsuario);
        return newUsuario;
    }
    InserirUsuario(usuario) {
        this.usuarios.push(usuario);
    }
    buscarUsuarioPorCPF(cpf) {
        return this.usuarios.find(usuario => usuario.cpf === cpf);
    }
    listarUsuarios() {
        return this.usuarios;
    }
    atualizarDadosUsuario(cpf, novosDados) {
        const usuario = this.buscarUsuarioPorCPF(cpf);
        if (!usuario)
            return undefined;
        if (novosDados.nome) {
            usuario.nome = novosDados.nome;
        }
        if (novosDados.email) {
            usuario.email = novosDados.email;
        }
        if (novosDados.categoriaId) {
            usuario.categoriaId = novosDados.categoriaId;
        }
        if (novosDados.cursoId) {
            usuario.cursoId = novosDados.cursoId;
        }
        return usuario;
    }
    removerUsuario(cpf) {
        const index = this.usuarios.findIndex(u => u.cpf === cpf);
        if (index == -1) {
            return false;
        }
        this.usuarios.splice(index, 1);
        return true;
    }
}
exports.UsuarioRepository = UsuarioRepository;
