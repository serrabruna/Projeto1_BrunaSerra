"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    cpf;
    nome;
    email;
    categoria;
    curso;
    status;
    diaSuspensao;
    constructor(cpf, nome, email, categoria, curso) {
        this.cpf = cpf;
        this.nome = nome;
        this.email = nome;
        this.categoria = categoria;
        this.curso = curso;
        this.status = 'ativo';
        this.diaSuspensao = 0;
    }
}
exports.Usuario = Usuario;
