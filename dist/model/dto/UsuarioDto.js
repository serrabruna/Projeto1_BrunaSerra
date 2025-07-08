"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioDto = void 0;
class UsuarioDto {
    id;
    cpf;
    nome;
    email;
    categoriaId;
    cursoId;
    status;
    diaSuspensao;
    suspensaoAte;
    constructor(id, cpf, nome, email, categoriaId, cursoId, status, diaSuspensao, suspensaoAte) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
        this.status = status;
        this.diaSuspensao = diaSuspensao;
        this.suspensaoAte = suspensaoAte;
    }
}
exports.UsuarioDto = UsuarioDto;
