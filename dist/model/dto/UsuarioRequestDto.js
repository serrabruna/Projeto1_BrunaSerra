"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRequestDto = void 0;
class UsuarioRequestDto {
    cpf;
    nome;
    email;
    categoriaId;
    cursoId;
    constructor(cpf, nome, email, categoriaId, cursoId) {
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
    }
}
exports.UsuarioRequestDto = UsuarioRequestDto;
