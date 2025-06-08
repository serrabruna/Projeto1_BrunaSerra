"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
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
