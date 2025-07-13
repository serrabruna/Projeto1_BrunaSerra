"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRequestDto = void 0;
class UsuarioRequestDto {
    nome;
    email;
    categoriaId;
    cursoId;
    constructor(nome, email, categoriaId, cursoId) {
        this.nome = nome;
        this.email = email;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
    }
}
exports.UsuarioRequestDto = UsuarioRequestDto;
